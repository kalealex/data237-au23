# DATA 23700 Resources

Here are references and resources for the course separated by topic. 
This is where we will share links to readings, tutorials, examples, and programming tools.


## Software

This is where we'll post links to software tools and demos, separated by topic.

### Getting started with computational notebooks

- Welcome to [Google Colab](https://colab.research.google.com/drive/16pBJQePbqkz3QFV54L4NIkOn1kwpuRrj#scrollTo=u1wdmFKqylSI)
- Using [Google Colab with GitHub](https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb)
- UChicago CS guide to [setting up VS Code](https://uchicago-cs.github.io/student-resource-guide/vscode/about.html).
- Although we do not use R much this quarter, it supports an excellent data science toolkit. You can check out [RStudio](https://posit.co/download/rstudio-desktop/) as an alternative IDE for R if you don't want to use VS Code or Colab.

### Programming tools

- Basic [pandas tutor](https://pandastutor.com/) demonstrating common dataframe operations
- [Intro to pandas](https://colab.research.google.com/notebooks/mlcc/intro_to_pandas.ipynb#scrollTo=JndnmDMp66FL) in Google Colab
- The primary visualization API we teach in this course is **Altair**. Check out their [user guide](https://altair-viz.github.io/user_guide/data.html), [example gallery](https://altair-viz.github.io/gallery/index.html), [API](https://altair-viz.github.io/user_guide/API.html), and more on the same website! 
- Altair is actually a wrapper around a JavaScript library called Vega-Lite. If you're interested, check out the [Vega-Lite example gallery](https://vega.github.io/vega-lite/examples/) to compare its syntax with that of Altair.
- [Vega](https://vega.github.io/vega/) and [Vega-Lite](https://vega.github.io/vega-lite/) are declarative grammars for interactive visualization that compile to [D3](https://d3js.org/) visualizations. Altair leverages this software stack by wrapping python syntax around Vega-Lite. We may spend some time learning about these JavaScript libraries when we do our unit on making data interactive.
- From the creators of popular visualization toolkits like D3, Vega, and Vega-Lite, the University of Washington Interactive Data Lab has graciously made their [visualization curriculum](https://github.com/uwdata/visualization-curriculum) public! The notebooks posted here give an excellent walkthrough of some topics we'll cover in this course.
- The [PyMC](https://www.pymc.io/welcome.html) and [arviz](https://python.arviz.org/en/stable/examples/index.html) APIs for Bayesian statistics workflows in Python.
- Matthew Kay's [ggdist R package](https://mjskay.github.io/ggdist/) for visualizing distributions. This is the best tool around for uncertainty visualization.
- [Scikit-learn](https://scikit-learn.org/stable/) Python module for ML
- Microsoft's open source Python module for ML interpretability, [interpret](https://github.com/interpretml/interpret/)

<!-- ### Demos and videos

- Interactive [scatterplot matrix](https://vega.github.io/vega/examples/brushing-scatter-plots/)
- Hans Rosling's [visualization storytelling](https://www.youtube.com/watch?v=hVimVzgtD6w)
- Amanda Cox from the New York Times on [uncertainty visualizations in the news](https://www.youtube.com/watch?v=0L1tGo-DvD0) (2:55 – 10:43)
- Fred Hohman's presentations about his work on [ML interpretability](https://fredhohman.com/dissertation/) -->


<!-- ### Choosing colors

- An overview of [color schemes](https://observablehq.com/@d3/color-schemes) available in Altair.
- The [ColorBrewer](https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3) tool for choosing color palettes. -->

<!-- ### Map projections

- An interactive gallery of [map projections](https://observablehq.com/@d3/projection-transitions) available in Altair -->

<!-- ### Data stories

- [Idyll](https://idyll-lang.org/gallery) language for interactive data stories.
- Check out more interactive articles on [Distill Pub](https://distill.pub/) and the [Parametric Press](https://parametric.press/issue-02/) -->


## Readings

Here are optional readings for the course separated by topic.

### The value of visualization

- A well regarded [academic article](https://www.cc.gatech.edu/~stasko/7450/Papers/vanwijk-vis05.pdf) on the value of visualization.
- Obligatory sharing of [Tufte's Visual Display of Quantitative Information](http://faculty.salisbury.edu/~jtanderson/teaching/cosc311/fa21/files/tufte.pdf). Classes like this one often assign the first three chapters of this book as reading, probably because Tufte's work is rich with examples. However, Tufte sometimes asserts as design principles ideas that don't hold up when subjected to empirical scrutiny. His work is still viewed by the visualization community, with skepticism, as a wonderful resource.

<!-- ### The science of visualization design

- This [paper by Cleveland and McGill](http://euclid.psych.yorku.ca/www/psy6135/papers/ClevelandMcGill1984.pdf) set a precedent for treating visualization effectiveness as an empirical question. Many papers have followed up on this work, and the findings remain roughly intact.
- [Mackinlay's APT paper](https://info.sice.indiana.edu/~katy/S637-S11/Mackinlay86.pdf) lays out his expressiveness and effectiveness criteria for visualization design. This paper kicked off a long line of work on visualization recommender systems.
- Particularly interesting violations of the expressiveness principle (a.k.a. "tell the truth and nothing but the truth") occur when people's expectations about what a certain kind of chart will show are violated. Among other sources, these expectations are informed by **graphical conventions**, such as the expectations that people have about the semantics of bars and lines addressed in this [paper by Zacks and Tversky](https://dcl.wustl.edu/files/2017/09/zacksmemcog99-12d5ktx.pdf), which I mentioned in class.
- A few years ago, some of my colleagues at Northwestern decided there was too much visualization research for practitioners to keep up with. They led an effort to write this review article summarizing the [science of "what works"](https://journals.sagepub.com/doi/reader/10.1177/15291006211051956) in data visualization design. -->

<!-- ### Cartography

- A nice [survey paper](https://parkerziegler.com/papers/a-need-finding-study-with-users-of-geospatial-data.pdf) on map making tools and why they are mostly hard to use -->

<!-- ### Interaction and animation

- Data driven documents ([D3](http://vis.stanford.edu/papers/d3)) is the javascript library that supports most interactive visualizations on the web.
- [Animated Transitions in Statistical Graphics](https://idl.cs.washington.edu/files/2007-AnimatedTransitions-InfoVis.pdf) is an authoritative paper on animation design for visualization.
- Interesting paper on using [animation to show aggregation operations](https://idl.cs.washington.edu/files/2019-AnimatedAggregates-EuroVis.pdf)
- [Animation: Can it facilitate?](https://hci.stanford.edu/courses/cs448b/papers/Tversky_AnimationFacilitate_IJHCS02.pdf) is a great review article by Barbara Tversky -->

<!-- ### Narrative visualization, deception, and persuasion

- Hullman's paper on [visualization rhetoric](http://users.eecs.northwestern.edu/~jhullman/vis_rhetoric.pdf).
- Correll's paper on [truncating the y-axis](https://arxiv.org/pdf/1907.02035).
- Correll's paper on [visualization ethics](https://arxiv.org/pdf/1811.07271).
- Recent analysis of [how people actually lie with charts](https://dl.acm.org/doi/pdf/10.1145/3544548.3580910).
- Segel and Heer's [analysis of narrative strategies](https://idl.cs.washington.edu/files/2010-Narrative-InfoVis.pdf) in data storytelling.
- Hohman et al's [analysis of interactive articles](https://distill.pub/2020/communicating-with-interactive-articles/).
- Papers on [Idyll](https://idl.cs.washington.edu/files/2018-Idyll-UIST.pdf) and [Idyll Studio](https://idl.cs.washington.edu/files/2021-IdyllStudio-UIST.pdf). -->

<!-- ### Uncertainty visualization

- Hullman's article on [Why authors don't visualize uncertainty](https://mucollective.northwestern.edu/files/2019-Value%20of%20Uncertainty-VIS.pdf).
- Kay's first study on [uncertainty in bus arrival times](https://mucollective.northwestern.edu/files/2016-WhenIsMyBus-CHI.pdf) where he introduces quantile dotplots, and the [second study](https://mucollective.northwestern.edu/files/2018-UncertainBusDecisions-CHI.pdf) where they use a decision task.
- Prof. Kale's work on [decision making with uncertainty visualizations](https://mucollective.northwestern.edu/files/2020%20-%20Kale,%20Visual%20Reasoning%20Strategies%20for%20Effect%20Size%20Judgements.pdf).
- Hullman and Gelman's manifesto on [visualizations as model checks](https://mucollective.northwestern.edu/files/2021-hdsr-paper.pdf) -->

<!-- ### ML Interpretability

- Fred Hohman's work on [Gamut](https://fredhohman.com/papers/19-gamut-chi.pdf) and [Summit](https://fredhohman.com/papers/19-summit-vast.pdf)
- Interpretability by proxy using [LIME](https://arxiv.org/pdf/1602.04938)
- Interpretability by marginal feature importance using [SHAP](https://arxiv.org/pdf/1705.07874)
- A brief write up about [Microsoft's interpretML](https://arxiv.org/pdf/1909.09223) -->

