"""Smoke checks on actual Jekyll output: navigation, publications and assets."""
from html.parser import HTMLParser
from pathlib import Path
import sys
import json
import re
import unittest

ROOT = Path(sys.argv.pop(1)) if len(sys.argv) > 1 else Path('_site')

class Document(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids, self.links, self.images, self.tags = [], [], [], []
        self.text = path.read_text()
        self.feed(self.text)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if 'id' in attrs: self.ids.append(attrs['id'])
        if tag == 'a': self.links.append(attrs.get('href', ''))
        if tag == 'img': self.images.append(attrs)

class PortfolioChecks(unittest.TestCase):
    def test_home_story_and_navigation(self):
        d = Document(ROOT / 'index.html')
        sections = ['introduction', 'research', 'applied-ai', 'background', 'milestones', 'contact']
        positions = [d.text.index('id="'+section+'"') for section in sections]
        self.assertEqual(positions, sorted(positions))
        self.assertEqual(len(d.ids), len(set(d.ids)))
        for href in d.links:
            if href.startswith('#'): self.assertIn(href[1:], d.ids)
        self.assertIn('AI that adapts to who it', d.text)
        self.assertTrue('Ricca IT' in d.text, 'Current Ricca IT role missing')
        self.assertTrue(any('mailto:' in h and ('dani' in h or '&#' in h) for h in d.links))
    def test_all_papers_link_to_pdfs(self):
        d = Document(ROOT / 'publications/index.html')
        expected = ['2026.emnlp-main.445.pdf', '2025.acl-long.879.pdf', '2024.findings-acl.707.pdf', '2024.findings-naacl.222.pdf', 'paper143.pdf']
        for pdf in expected: self.assertTrue(any(h.endswith(pdf) for h in d.links), pdf)
        self.assertTrue('Malvina Nissim' in ' '.join(d.text.split()), 'Coauthor missing')
        self.assertIn('Proceedings of the 2026', d.text)
        self.assertGreaterEqual(sum(t=='details' for t,a in d.tags), 5)
        self.assertNotIn('When Harry Meets Superman</a>', d.text)
    def test_local_links_and_images(self):
        for route in ['index.html', 'publications/index.html', 'cv/index.html']:
            d = Document(ROOT / route)
            for href in d.links + [i['src'] for i in d.images]:
                if not href.startswith('/') or href.startswith('//'): continue
                target = ROOT / href.split('#')[0].split('?')[0].lstrip('/')
                self.assertTrue(target.exists(), f'{route}: {href}')
            for image in d.images: self.assertIn('alt', image)
    def test_metadata_current_affiliation(self):
        d = Document(ROOT / 'index.html')
        schemas = [json.loads(x) for x in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', d.text, re.S)]
        person = next(x for x in schemas if x.get('@type') == 'Person')
        self.assertEqual(person['jobTitle'], 'AI Researcher & Engineer')
        self.assertEqual(person['affiliation']['name'], 'Ricca IT')

    def test_cv_heading_structure(self):
        d = Document(ROOT / 'cv/index.html')
        headings = [int(tag[1]) for tag, attrs in d.tags if re.fullmatch('h[1-6]', tag)]
        for before, after in zip(headings, headings[1:]):
            self.assertLessEqual(after, before + 1, 'CV heading levels skip a section level')

    def test_milestone_history_is_reachable(self):
        home = Document(ROOT / 'index.html')
        self.assertIn('/news/', home.links)
        archive = Document(ROOT / 'news/index.html')
        expected = len(list(Path('_news').glob('*.md')))
        actual = sum(tag == 'li' and 'portfolio-milestone-entry' in attrs.get('class', '').split() for tag, attrs in archive.tags)
        self.assertEqual(actual, expected, 'All existing milestones must be retained')
        for href in archive.links:
            if href.startswith('/news/'):
                target = ROOT / href.strip('/') / 'index.html'
                self.assertTrue(target.exists(), href)

    def test_current_cv_and_email(self):
        d = Document(ROOT / 'cv/index.html')
        self.assertTrue('Ricca IT' in d.text, 'Current Ricca IT role missing')
        self.assertTrue('dani.occhipinti91@gmail.com' in d.text, 'Personal contact email missing')
        self.assertIn('2026', d.text)
        self.assertIn('Stranger, Fan, or Peer?', d.text)

if __name__ == '__main__': unittest.main()
