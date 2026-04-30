---
layout: about
title: About
permalink: /
subtitle: Researcher at <a href='https://www.fbk.eu/en/'>Fondazione Bruno Kessler</a>.
description: Daniela Occhipinti is an NLP researcher at Fondazione Bruno Kessler (FBK) specialising in persona-based dialogue generation — in particular, how dialogue systems can maintain a speaker's identity while adapting to different conversational partners.

profile:
  align: right
  image: prof_pic.jpeg
  image_circular: false # crops the image to make it circular
  more_info: false

news: true
selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page
---
<p class="hero-thesis">
  I study persona-based dialogue generation — not just how a system represents who you are, but how it adapts to <em>who you are speaking with</em>.
</p>

<div class="homepage-highlights" aria-label="Areas of expertise">
  <div class="highlight-item">
    <span class="highlight-label">Research</span>
    <p>Persona-based dialogue, interlocutor adaptation, LLM evaluation</p>
  </div>
  <div class="highlight-item">
    <span class="highlight-label">Applied AI</span>
    <p>RAG systems, conversational agents, retrieval pipelines</p>
  </div>
  <div class="highlight-item">
    <span class="highlight-label">Engineering</span>
    <p>Production NLP, REST APIs, Docker</p>
  </div>
</div>

<p>
  I am a Researcher in the Language and Dialogue Technologies (<a href="https://land.fbk.eu/">LanD</a>) group at Fondazione Bruno Kessler (<a href="https://www.fbk.eu/en/">FBK</a>) in Trento, Italy. My path into NLP began in Digital Humanities at the <a href="https://www.unipi.it/en/">University of Pisa</a>, where I became interested in language technologies as a way to study people, interpretation, and communication through computational methods.
</p>

<p>
  I completed a PhD in Information Engineering and Computer Science at the <a href="https://www.unitn.it/en/">University of Trento</a> and FBK, with honors, working on persona-based dialogue generation. My thesis investigates a largely overlooked dimension of this problem: dialogue is inherently dyadic. How we speak depends not only on who we are, but on whom we are speaking with. I study how models can balance maintaining a speaker's consistent identity with adapting to different conversational partners — and what happens when they fail to do so.
</p>

<div class="homepage-currently">
  <h2>Currently</h2>
  <p>At LanD-FBK I continue working on persona-based dialogue and interlocutor adaptation, alongside applied work on RAG systems, conversational agents, and LLM fine-tuning for production NLP.</p>
</div>

<h2>What My Research Is About</h2>

<div class="research-question-grid">
  <div class="research-question-card">
    <h3>Which profile dimensions actually drive persona-consistent dialogue?</h3>
    <p>A speaker profile can include biography, personality, gender, and communication style. I investigate which of these dimensions models rely on most — and find that biography is the most informative signal for capturing character identity.</p>
  </div>
  <div class="research-question-card">
    <h3>Do models truly adapt to their conversational partner, or just copy from profiles?</h3>
    <p>When a model has access to both the target speaker's and the interlocutor's profiles, does it learn to balance them — or does it default to surface-level reproduction? My work shows models adapt more easily to unfamiliar topics than to unfamiliar interlocutors, revealing that <em>who you speak with</em> matters more than <em>what you speak about</em>.</p>
  </div>
  <div class="research-question-card">
    <h3>What happens when interlocutor information is withheld — or leaks through anyway?</h3>
    <p>Whether a model sees its conversational partner's profile during training, at inference, or not at all fundamentally shapes what it learns. I study these disclosure asymmetries and find that persona content leaks through interlocutor turns even when the target biography is only indirectly available.</p>
  </div>
</div>
