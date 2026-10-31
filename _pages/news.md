---
layout: page
title: Milestones
permalink: /news/
description: Publications, presentations, research visits and other milestones along the way.
nav: false
nav_order: 2
---

{% assign milestones = site.news | sort: 'date' | reverse %}

<ul class="portfolio-milestones" aria-label="All milestones">
  {% for item in milestones %}
    <li class="portfolio-milestone-entry">
      <time datetime="{{ item.date | date_to_xmlschema }}">{{ item.date | date: '%b %Y' }}</time>
      <p><a href="{{ item.url | relative_url }}">{{ item.title }}</a></p>
    </li>
  {% endfor %}
</ul>
