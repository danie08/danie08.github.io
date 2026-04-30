---
layout: page
permalink: /publications/
title: Publications
description: Publications by Daniela Occhipinti on persona-based dialogue generation, conversational AI evaluation, and NLP — including papers at ACL 2025, ACL 2024 Findings, and NAACL 2024 Findings.
nav: true
nav_order: 3
---

<!-- _pages/publications.md -->

<section class="featured-publications-intro">
  <h2>Start Here</h2>
  <p>
    These papers give the clearest entry point into my current research agenda: how dialogue systems represent people, how data quality shapes conversational models, and how interlocutors influence generation.
  </p>
</section>

<section class="featured-publications-grid" aria-label="Featured publications">
  <article class="featured-publication-card">
    <span class="featured-publication-label">ACL 2025</span>
    <h3><a href="https://aclanthology.org/2025.acl-long.879/">When Harry Meets Superman</a></h3>
    <p>This paper is the strongest expression of my current research direction: dialogue models should adapt not only to a target persona, but also to the interlocutor and the relationship between speakers.</p>
  </article>
  <article class="featured-publication-card">
    <span class="featured-publication-label">ACL 2024 Findings</span>
    <h3><a href="https://aclanthology.org/2024.findings-acl.707/">HED-IT</a></h3>
    <p>HED-IT asks how human post-editing affects the quality of dialogue training data, connecting model behavior to the often-hidden question of what counts as good conversational supervision.</p>
  </article>
  <article class="featured-publication-card">
    <span class="featured-publication-label">NAACL 2024 Findings</span>
    <h3><a href="https://aclanthology.org/2024.findings-naacl.222/">PRODIGy</a></h3>
    <p>PRODIGy introduces a dataset for studying richer speaker representations in dialogue generation and lays the groundwork for much of my later work on persona-aware systems.</p>
  </article>
</section>

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">
  {% bibliography %}

</div>
