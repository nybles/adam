Nybles is the Tech newletter for IIIT-Allahabad. 

We invite posts from everyone.

## Post layout

```
---
layout: Post
title: Add your title
author: Author name
categories: Only three categories are now : future, trending and campus
intro: Will be shown in the main page if specified
---

content should be added here,No need to add title name again.

```

### Scripts 

if you want to fetch another persons pull request and edit,then 

` ./fetch_pull_request <pull-request-id> <remote value = upstream by default> `

## Layout

Here's the clue for hackers:
* The posts are in the \_posts directory.
* The site data is available in \_data directory.
  - The links in navbar / sidebar can be edited from \_data/urls.json.
  - The social links for the blog owner can be provided from \_data/social.json.
  - The list of events are available at, and can be modified from \_data/events.json.

* The *\_config.yml* is the configuration file for the entire blog. *Handle with care!*


[Original fork](https://codeasashu.github.io/hcz-jekyll-blog/)*

## Git/Github Tutorials

### Git: Introduction

- [Git - the simple guide (awesome)](http://rogerdudler.github.io/git-guide/)
- [An Intro to Git and GitHub for Beginners (Tutorial)](http://product.hubspot.com/blog/git-and-github-tutorial-for-beginners)

#### Github: Introduction

- [An Intro to Git and GitHub for Beginners (Tutorial)](http://product.hubspot.com/blog/git-and-github-tutorial-for-beginners)
- [Github Hello World](https://guides.github.com/activities/hello-world/)
- [Changing a commit message](https://help.github.com/articles/changing-a-commit-message/)

### Merge Commits

- [How To Manually Fix Git Merge Conflicts (video)](https://www.youtube.com/watch?v=g8BRcB9NLp4)

#### Squash Commits

- [Git Rebase (squash last commit)](https://www.youtube.com/watch?v=qh9KtjfjzCU)
- [Squash Commits with Git](https://davidwalsh.name/squash-commits-git)

##Installation - I want to see this running live on my computer.

## Prerequisites
### Mac OSX/Linux
OpenCode is built with [jekyll](https://jekyllrb.com/) which comes as a ruby gem. So you need to install Ruby to get started.

[RVM](https://rvm.io/) make it easy to install and manage different versions of Ruby. Install Ruby using RVM by running the following commands

```
~ $ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3

~ $ \curl -sSL https://get.rvm.io | bash -s stable --ruby
```

This installs RVM with the latest stable version of Ruby

**Ubuntu users:** You may need to enable `Run command as a login shell` in Ubuntu's Terminal, under _Edit > Profile Preferences > Title and Command_. Then close the terminal and reopen it. You may also want to run `source ~/.rvm/scripts/rvm` to load RVM.

To install ruby gems from a Gemfile you would need `bundler` which by default comes with RVM ruby but if isn't present you would need to install it using the command `gem install bundler`.

### Windows

If on Windows, you can follow [this guide](https://jekyllrb.com/docs/windows/) on how to install [jekyll](https://jekyllrb.com/).

## Deployment
After you have installed Ruby and cloned the repository deploy the application running the following commands
```
# Enter the app directory


# Install gems using bundler
~$ bundle install

# Build site starting jekyll server
~$ bundle exec jekyll serve
```

You are ready to go! Browse to `http://localhost:4000` 
