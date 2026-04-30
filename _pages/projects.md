---
layout: page
title: Projects
permalink: /projects/
description: Selected research projects in persona-based dialogue generation and evaluation.
nav: true
nav_order: 4
display_categories: [work, fun]
horizontal: false
---
This page brings together the three research threads that currently define my work. They are connected by one broader question: how can dialogue systems model people and social interaction in ways that are both computationally useful and conversationally meaningful?

<section class="project-story">
  <h2>PRODIGy</h2>
  <p class="project-story-question">Research question: what kinds of speaker information actually help a dialogue model represent a person?</p>
  <p>
    With <strong>PRODIGy</strong>, I worked on a dataset designed to move beyond flat persona descriptions by aligning dialogues with multiple kinds of speaker information, including biography, personality, communication style, and gender. The goal was to create a richer resource for studying how profile representations shape generation.
  </p>
  <p>
    The main contribution of this project is a stronger foundation for persona-based dialogue research: instead of treating profile information as a single text field, it opens the door to studying which aspects of identity and style matter most, when, and why.
  </p>
  <p class="project-story-takeaway">Takeaway: better dialogue personalization starts with better ways of representing people.</p>
  <p class="project-story-links">
    <a href="https://aclanthology.org/2024.findings-naacl.222/">Paper</a>
    <span>·</span>
    <a href="https://github.com/LanD-FBK/prodigy-dataset">Code and data</a>
    <span>·</span>
    <a href="{{ '/news/paper-accepted-at-naacl-2024-findings/' | relative_url }}">News</a>
  </p>
</section>

<section class="project-story">
  <h2>HED-IT</h2>
  <p class="project-story-question">Research question: how much does data quality matter when fine-tuning dialogue models?</p>
  <p>
    <strong>HED-IT</strong> focuses on the role of human post-editing in dialogue data creation. I studied how machine-generated and human-edited dialogues differ, and how those differences affect downstream model behavior during fine-tuning.
  </p>
  <p>
    This project connects model performance to the quality of the data behind it. Rather than assuming that more data is always better, it asks whether better curated conversational data changes what models learn and how users perceive their outputs.
  </p>
  <p class="project-story-takeaway">Takeaway: conversational quality is shaped not only by model size, but by the care invested in the training data.</p>
  <p class="project-story-links">
    <a href="https://aclanthology.org/2024.findings-acl.707/">Paper</a>
    <span>·</span>
    <a href="https://github.com/LanD-FBK/hed-it">Code and data</a>
    <span>·</span>
    <a href="{{ '/news/paper-accepted-at-acl-2024-findings/' | relative_url }}">News</a>
  </p>
</section>

<section class="project-story">
  <h2>Interlocutor-Aware Persona Dialogue</h2>
  <p class="project-story-question">Research question: what changes when a dialogue model must adapt to both a speaker and their interlocutor?</p>
  <p>
    My ACL 2025 work studies how dialogue generation changes when conversational systems are asked to model not only a target speaker profile, but also the person they are speaking to. This shifts the framing from isolated personas to interaction, familiarity, and relational context.
  </p>
  <p>
    The project examines whether models generalize across topics, how they behave with familiar versus unfamiliar interlocutors, and when persona consistency reflects genuine adaptation rather than superficial copying.
  </p>
  <p class="project-story-takeaway">Takeaway: believable dialogue depends on social context, not just a single speaker profile.</p>
  <p class="project-story-links">
    <a href="https://aclanthology.org/2025.acl-long.879/">Paper</a>
    <span>·</span>
    <a href="{{ '/news/paper-accepted-at-acl-2025-main/' | relative_url }}">Acceptance news</a>
    <span>·</span>
    <a href="{{ '/news/poster-presentation-at-acl-2025-in-vienna/' | relative_url }}">Poster presentation</a>
  </p>
</section>
