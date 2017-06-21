---
layout: page
title: Contribute to freesewing
tags: [contributors]
permalink: /contribute
---
## Welcome

Hi there, 

Are you interested in contributing to freesewing? We'd love your help. 
It's exactly why we made this thing open source in the first place.

## Code of conduct

We strive to be an open and inclusive community.
To keep the trolls at bay, we have a [code of conduct](/about/code-of-conduct). 
and we ask contributors to uphold it.

## Where to get help or report a problem

- The freesewing community on Gitter is the best place to ask questions, 
meet other freesewers, or just hang out and share a laugh. [Join the freesewing community on Gitter](https://gitter.im/freesewing/freesewing).
- Chat not your thing? The [@freesewing_org](https://twitter.com/freesewing_org) 
account on Twitter is the next best thing.
- Did you spot a mistake? Have a suggestion for an improvement? 
Please [file an issue on GitHub](https://github.com/freesewing/freesewing.github.io/issues/new). 
You'll need a GitHub account, but they are free.

## Ways to contribute

Whether you're a developer, a designer, a maker, or just a passer-by, 
there are lots of ways to contribute. Here are few ideas:

### For everyone

- Read through the documentation, and any time you see something confusing, 
or have a suggestion for something that could be improved, click the
 _improve this page_ link that you find at the very bottom of every page. 
- [Join the freesewing community on Gitter](https://gitter.im/freesewing/freesewing) to talk to like-minded people with a love for sewing on a mission

### For makers

- Make our patterns, and provide us with your feedback
- Improve the pattern instructions
- Share your makes with the community, using the #freesewing hashtag
- Spread the word about freesewing, because we don't have a marketing budget

### For designers

- Host your designs on freesewing.org
- Let us help you port your existing designs to the freesewing platform
- Use freesewing to build your pattern business on

### For developers

- Install freesewing on your computer and kick the tires. Does it work?
Does it what you'd expect? If not, [open an issue](https://github.com/freesewing/freesewing.github.io/issues/new)
 and let us know.
- Comment on some of our [open issues](https://github.com/freesewing/freesewing.github.io/issues). 
Have you experienced the same problem? Know a work around? 
- Hang out at [the freesewing community on Gitter](https://gitter.im/freesewing/freesewing), and lend a hand answering questions. 
There's a good chance you.ve already experienced what another user is experiencing.
- Find an open issue (especially those labeled _help-wanted_), and submit a proposed fix. 
If it's your first pull request, we promise we won't bite, and are glad to answer any questions.
- Help evaluate open pull requests, by testing the changes locally and reviewing what's proposed.
to fix sewing patterns once and for all.

## Submitting a pull request

- The smaller the proposed change, the better. If you'd like to propose two unrelated changes, submit two pull requests.
- The more information, the better. Make judicious use of the pull request body. 
Describe what changes were made, why you made them, and what impact they will have for users.
- Pull requests are easy and fun. If this is your first pull request, it may help to [understand GitHub Flow](https://guides.github.com/introduction/flow/).
- If you're submitting a code contribution, be sure to read the code contributions section below.

### Submitting a pull request via github.com

Many small changes can be made entirely through the github.com web interface.


1. Navigate to the file within [a repository](/docs/repositories) that you'd like to edit.
2. Click the pencil icon in the top right corner to edit the file
3. Make your proposed changes
4. Click _Propose file change_.
5. Click _Create pull request_.
6. Add a descriptive title and detailed description for your proposed change. The more information the better.
7. Click _Create pull request_.

That's it! You'll be automatically subscribed to receive updates as others review your proposed change and provide feedback.

## Proposing updates to the documentation

We want the freesewing documentation to be the best it can be. 
We've open-sourced our docs and we welcome any pull requests if you find it lacking.

### Jekyll and markdown
Our documentation is written in markdown and generated by Jekyll.
The [Typography page](/docs/site/typography) has an overview of most of the page elements we use. 

### How to submit changes

You can find the documentation for freesewing in [the docs repository](https://github.com/freesewing/docs). 
See the section above &mdash; [submitting a pull request](#submitting-a-pull-request) &mdash;
for information on how to propose a change.

## Code contributions

Interesting in submitting a pull request? Awesome. Read on for a few things you should know.

### Coding standard and autoloading

Freesewing uses the [PSR-2 coding standard](http://www.php-fig.org/psr/psr-2/), 
and the [PSR-4 autoloader](http://www.php-fig.org/psr/psr-4/). 

Please make sure to respect both the coding standard and the naming conventions of the autoloader.

### PHP 5.6 compatibility

While PHP7 is a lot faster and provides some cool new features, a lot of (shared) hosting
environments still ship with the PHP 5.6 branch.

To make deployment as easy as possible, we are keeping the freesewing codebase compatible
with PHP5.6 and up.

This means you should refrain from using PHP7-only syntax until at some point in the future
we will decide to drop support for PHP5.

### Unit tests

We use PHPUnit for unit tests. The tests are located in the _tests_ folder.

At the very least, you should run tests before and after your code changes to see
the impact. Preferably, your pull request will contain new/updated unit tests to test your code.

## Credits

This contributor documentation borrows heavily from 
[the Jekyll project](http://jekyllrb.com/docs/contributing/). Thanks guys.




* TOC - Do not remove this line
{:toc}
