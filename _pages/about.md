---
layout: about
title: About
permalink: /
subtitle: AI Researcher & Engineer
seo_title: Daniela Occhipinti | AI Researcher & Engineer
description: Daniela Occhipinti is an AI researcher and engineer working on conversational AI, LLM applications, RAG, agents, and evaluation at Ricca IT.
last_modified_at: 2026-11-02
---

<section id="introduction" class="portfolio-section" aria-labelledby="introduction-title">
  <h2 id="introduction-title" class="portfolio-eyebrow">Introduction</h2>
  <p class="portfolio-lead">Connecting AI research<br>with real-world applications.</p>
  <p>I’m Daniela, an <strong>AI researcher and engineer</strong>.</p>
  <p>I’m particularly interested in AI that responds to people’s individual characteristics. My broader motivation is to build technology that makes information and everyday tasks more accessible, while <strong>supporting people’s autonomy</strong>.</p>
  <p>My work spans research on persona-based dialogue and the development of LLM applications at <strong><a href="https://www.ricca-it.com/">Ricca IT</a></strong>.</p>
</section>

<section id="research" class="portfolio-section" aria-labelledby="research-title">
  <h2 id="research-title" class="portfolio-eyebrow">Research · the questions I explore</h2>
  <h3>AI that adapts to who it’s talking to</h3>
  <p>Human conversation is shaped by both who we are and who we’re speaking with. My research explores this relationship in conversational AI: how language models express a persona while adapting to their interlocutor’s profile and individual characteristics.</p>
  <p>I investigate how information about each participant shapes generated dialogue, and how to evaluate whether models use that information meaningfully rather than simply repeat it.</p>
  <div class="publications portfolio-publications">
    {% bibliography --query @*[homepage=true]* %}
  </div>
  <p class="portfolio-more"><a href="{{ '/publications/' | relative_url }}">All publications <span aria-hidden="true">↗</span></a></p>
</section>

<section id="applied-ai" class="portfolio-section" aria-labelledby="applied-title">
  <h2 id="applied-title" class="portfolio-eyebrow">Applied AI · putting ideas into practice</h2>
  <h3>Building systems. Examining how they work.</h3>
  <p>Alongside these research interests, I work on practical AI systems at <strong><a href="https://www.ricca-it.com/">Ricca IT</a></strong>. My role spans designing and developing LLM applications, RAG pipelines and agents, and testing how well they work in real use cases.</p>
  <p><strong>Evaluation connects these two sides of my work:</strong> asking what a model is doing, designing ways to assess it, and using the results to guide improvements.</p>
  <div class="portfolio-practice">
    <h4>LLM applications, RAG &amp; agents</h4>
    <p>Designing and developing applications, building retrieval-augmented generation pipelines and AI agents, and testing how they perform in practice.</p>
    <h4>Evaluation as part of development</h4>
    <p>Designing evaluation pipelines—including LLMs and agents as judges—to assess system behavior and inform improvements.</p>
    <ul class="portfolio-tags" aria-label="Areas of practice"><li>LLM applications</li><li>RAG</li><li>AI agents</li><li>Evaluation</li></ul>
  </div>
</section>

<section id="background" class="portfolio-section" aria-labelledby="background-title">
  <h2 id="background-title" class="portfolio-eyebrow">Background · the path so far</h2>
  <p>My background brings together doctoral research in conversational AI and experience developing NLP systems.</p>
  <ol class="portfolio-timeline">
    <li><span class="portfolio-period">Current</span><div><h3>AI Engineer · <a href="https://www.ricca-it.com/">Ricca IT</a></h3><p>LLM-based applications, retrieval, agents and evaluation.</p></div></li>
    <li><span class="portfolio-period">Research</span><div><h3><a href="https://www.fbk.eu/en/">Fondazione Bruno Kessler</a></h3><p>Language and Dialogue Technologies group. Persona-based dialogue generation and evaluation.</p></div></li>
    <li><span class="portfolio-period">PhD</span><div><h3><a href="https://iecs.unitn.it/">University of Trento (IECS)</a> &amp; <a href="https://www.fbk.eu/en/">FBK</a></h3><p>Information Engineering and Computer Science. Completed with honors.</p></div></li>
  </ol>
  <p class="portfolio-more"><a href="{{ '/cv/' | relative_url }}">View my CV <span aria-hidden="true">↗</span></a></p>
</section>

<section id="milestones" class="portfolio-section" aria-labelledby="milestones-title">
  <h2 id="milestones-title" class="portfolio-eyebrow">Recent milestones</h2>
  <ul class="portfolio-milestones">
    <li><time datetime="2026-10">Oct 2026</time><p><a href="https://aclanthology.org/2026.emnlp-main.445.pdf">Stranger, Fan, or Peer? A Systematic Study on the Role of Interlocutor in Persona-Based Dialogue Generation</a> published at EMNLP 2026.</p></li>
    <li><time datetime="2026-04-28">Apr 2026</time><p>Completed my doctorate on <strong>persona-based dialogue generation</strong> at the <a href="https://iecs.unitn.it/">University of Trento (IECS)</a> and <a href="https://www.fbk.eu/en/">FBK</a>, with honors.</p></li>
  </ul>
  <p class="portfolio-more"><a href="{{ '/news/' | relative_url }}">All milestones <span aria-hidden="true">↗</span></a></p>
</section>

<section id="contact" class="portfolio-section" aria-labelledby="contact-title">
  <h2 id="contact-title" class="portfolio-eyebrow">Get in touch</h2>
  <p>Feel free to get in touch via <a href="mailto:{{ site.data.socials.email }}">email</a> or <a href="https://www.linkedin.com/in/{{ site.data.socials.linkedin_username }}/">LinkedIn</a>.</p>
  <div class="portfolio-profile-links" aria-label="More profiles">{% include social.liquid %}</div>
</section>
