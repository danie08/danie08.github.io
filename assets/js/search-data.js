// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-news",
          title: "News",
          description: "News and updates from Daniela Occhipinti — conference presentations, paper acceptances, and research milestones in NLP and conversational AI.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "Publications by Daniela Occhipinti on persona-based dialogue generation, conversational AI evaluation, and NLP — including papers at ACL 2025, ACL 2024 Findings, and NAACL 2024 Findings.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "Selected research projects in persona-based dialogue generation and evaluation.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Academic CV of Daniela Occhipinti — NLP researcher at FBK specialising in persona-based dialogue generation and conversational AI.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "news-i-started-my-work-on-the-spirit-european-h2020-project",
          title: 'I started my work on the SPIRIT European H2020 project.',
          description: "",
          section: "News",},{id: "news-i-earned-my-master-s-degree-in-digital-humanities-from-the-university-of-pisa-with-a-thesis-titled-industrial-strength-multilingual-named-entity-collection-for-the-spirit-project",
          title: 'I earned my master’s degree in Digital Humanities from the University of Pisa,...',
          description: "",
          section: "News",},{id: "news-our-work-italianlp-tag-it-umberto-for-author-profiling-at-tag-it-2020-on-text-author-profiling-has-won-the-tag-it-task-of-evalita2020",
          title: 'Our work ItaliaNLP @ TAG-IT: UmBERTo for Author Profiling at TAG-it 2020 on...',
          description: "",
          section: "News",},{id: "news-started-a-phd-in-natural-language-generation-at-the-language-and-dialogue-technologies-land-group-under-the-supervision-of-marco-guerini",
          title: 'Started a PhD in Natural Language Generation at the Language and Dialogue Technologies...',
          description: "",
          section: "News",},{id: "news-from-july-4th-to-8th-2022-i-attended-the-deep-learning-for-natural-language-processing-10th-edition-in-san-sebastian",
          title: 'From July 4th to 8th, 2022 I attended the Deep Learning for Natural...',
          description: "",
          section: "News",},{id: "news-the-paper-prodigy-a-profile-based-dialogue-generation-dataset-has-been-accepted-for-publication-in-the-findings-of-the-association-for-computational-linguistics-naacl-2024",
          title: 'The paper PRODIGy: a PROfile-based DIalogue Generation dataset has been accepted for publication...',
          description: "",
          section: "News",},{id: "news-from-april-1st-to-june-30th-i-was-a-visiting-phd-student-at-the-center-for-language-and-cognition-groningen-supervised-by-professor-malvina-nissim",
          title: 'From April 1st to June 30th, I was a visiting PhD student at...',
          description: "",
          section: "News",},{id: "news-the-paper-fine-tuning-with-hed-it-the-impact-of-human-post-editing-for-dialogical-language-models-has-been-accepted-for-publication-in-the-findings-of-the-association-for-computational-linguistics-acl-2024",
          title: 'The paper Fine-tuning with HED-IT: The impact of human post-editing for dialogical language...',
          description: "",
          section: "News",},{id: "news-poster-presentation-at-naacl2024-virtual",
          title: 'Poster presentation at NAACL2024 (virtual)',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2024-06-10/";
            },},{id: "news-poster-presentation-at-acl2024-in-bangkok",
          title: 'Poster presentation at ACL2024 in Bangkok',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2024-08-11/";
            },},{id: "news-poster-presentation-at-clic-it-2024",
          title: 'Poster presentation at CLiC-it 2024',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2024-12-04/";
            },},{id: "news-our-paper-when-harry-meets-superman-the-role-of-the-interlocutor-in-persona-based-dialogue-generation-has-been-accepted-to-the-main-acl-2025-proceedings-this-project-is-especially-meaningful-to-me-because-it-pushes-my-research-beyond-speaker-centered-personas-and-toward-a-more-relational-view-of-dialogue-models-do-not-just-respond-as-someone-they-respond-to-someone-the-acceptance-feels-like-an-important-milestone-in-the-broader-research-path-i-am-building-around-persona-interlocutors-and-conversational-adaptation",
          title: 'Our paper When Harry Meets Superman: The Role of The Interlocutor in Persona-Based...',
          description: "",
          section: "News",},{id: "news-poster-presentation-at-acl-2025-in-vienna",
          title: 'Poster Presentation at ACL 2025 in Vienna',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2025-07-28/";
            },},{id: "news-i-am-happy-to-share-that-i-have-started-a-new-position-as-a-researcher-in-the-language-and-dialogue-technologies-group-at-fondazione-bruno-kessler-in-trento-this-feels-like-a-natural-next-step-in-the-research-trajectory-i-have-been-building-over-the-last-few-years-from-profile-based-dialogue-datasets-to-work-on-data-quality-and-interlocutor-aware-generation-i-am-excited-to-keep-developing-that-line-of-work-in-an-environment-where-conversational-ai-language-technologies-and-evaluation-can-be-studied-together",
          title: 'I am happy to share that I have started a new position as...',
          description: "",
          section: "News",},{id: "news-on-april-28th-i-successfully-defended-my-doctoral-thesis-on-persona-based-dialogue-generation-at-the-university-of-trento-and-fondazione-bruno-kessler-graduating-with-honors-it-has-been-a-demanding-and-deeply-rewarding-journey-crossing-this-finish-line-feels-like-both-a-conclusion-and-a-beginning-a-heartfelt-thank-you-to-my-advisors-dr-marco-guerini-and-prof-malvina-nissim-for-their-guidance-throughout-these-years-to-my-colleagues-for-their-constant-support-and-to-everyone-who-believed-in-me-along-the-way",
          title: 'On April 28th, I successfully defended my doctoral thesis on Persona-Based Dialogue Generation...',
          description: "",
          section: "News",},{
        id: 'social-bluesky',
        title: 'Bluesky',
        section: 'Socials',
        handler: () => {
          window.open("https://bsky.app/profile/docchipinti8.bsky.social", "_blank");
        },
      },{
        id: 'social-dblp',
        title: 'DBLP',
        section: 'Socials',
        handler: () => {
          window.open("https://dblp.org/pid/281/0329.html", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/danie08", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/daniela-occhipinti", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0009-7052-4671", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=yPrpiQQAAAAJ", "_blank");
        },
      },{
        id: 'social-scopus',
        title: 'Scopus',
        section: 'Socials',
        handler: () => {
          window.open("https://www.scopus.com/authid/detail.uri?authorId=57220749030", "_blank");
        },
      },{
        id: 'social-semanticscholar',
        title: 'Semantic Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://www.semanticscholar.org/author/2265752109", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/docchipinti8", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
