<H1> COP3530 - Project 2 </h1>
This is the template for Project 2 repositories. It includes all the assignment instructions and documentation to help you use GitHub.

<h2> Table of Contents </h2>

- [Documentation and resources on how to use GitHub for Project 2](#documentation-and-resources-on-how-to-use-github-for-project-3)
	- [Getting Started with the Project](#getting-started-with-the-project)
		- [Step 1: Create Your Project Repository](#step-1-create-your-project-repository)
		- [Step 2: Repository Name and Visibility](#step-2-repository-name-and-visibility)
		- [Step 3: Collaboration and Team Members](#step-3-collaboration-and-team-members)
		- [Step 4: Development](#step-4-development)
			- [Issues:](#issues)
			- [Branches](#branches)
			- [Commits](#commits)
				- [Guidelines for good commit messages](#guidelines-for-good-commit-messages)
			- [Pull Requests](#pull-requests)
	- [Markdown and README](#markdown-and-readme)
	- [Additional Resources and Documentation:](#additional-resources-and-documentation)
		- [General Documentation](#general-documentation)
		- [Additional Specific Documentation](#additional-specific-documentation)
			- [Quickstart](#quickstart)
			- [Repositories](#repositories)
			- [Branches](#branches-1)
			- [Issues](#issues-1)
			- [Bonus Documentation](#bonus-documentation)

# Documentation and resources on how to use GitHub for Project 2
## Getting Started with the Project

This is a group project. As such, you're expected to equally contribute to all parts of the project. To ensure everyone is contributing, we have moved this project entirely to GitHub and will use GitHub logs to understand your contributions. To fully leverage the features that GitHub offers, you have to be familiar with what they are and how to use them.

The goal of this project is to get you familiar with the creative process of software development for a general purpose use and how to use data structures or algorithms for those applications. To go with the professional development that the project offers in terms of general use application, you will also get more familiar with version control and GitHub platform to facilitate the collaborative work with extensive planning and organization abilities.

This step-by-step process is linked in this video **if you aren't familiar with GitHub**:
- [Introduction to GitHub - General GitHub Features](https://youtu.be/SoEPYV6Nrxo) - Has chapters and closed-captions

The following video has instructions on local development using Git and GitHub:
- [Local Development with Git and GitHub](https://youtu.be/9MPMu8qBfPo) - Has chapters and closed-captions

To illustrate the development process, we've also made a demo video to show how the GitHub flow looks like on an example:
- [Mastering GitHub Workflow](https://youtu.be/PbTdROv0TJw) - Has chapters and closed-captions

Here are the instructions on how to Collaborate for project 2 which are similar to what was covered in the Introduction to GitHub video. You may skip reading these if you have watched that video:

### Step 1: Create Your Project Repository

This is a template repository. If you want to know more about those, feel free to follow [this link](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository) to the GitHub documenation about templates and how to create them. You've used templates before for projects 1 and 2, and you will use it now, too. 

The first step of your project is to make your own repository for your own project that will host your source code and documentation. Only one member of the team needs to create a repo and everyone else copies that repo using git clone. 
1. Navigate to the main page of the repository.
2. Above the file list, in line with the repository name, click on the big green button saying **"Use this template"**
3. Select **"Create a new repository"** (This step is important. Do not open in codespace. Make your own repository for your own project.)

### Step 2: Repository Name and Visibility

Choose a descriptive name for your repository. This is part of some [good practices](https://docs.github.com/en/repositories/creating-and-managing-repositories/best-practices-for-repositories) about your GitHub repos. For this project, make sure to also make your repository public. The project is fully yours and you have all of the creative freedom, so feel free to use it as a part of your professional portfolio.

### Step 3: Collaboration and Team Members

Since this is a group project, you are **all** **expected** to **evenly contribute** to the repository. Regardless of if you're working on the code, the documentation, or the video, you all have to have access to the repository since that is the only submission for this part of the project.

To add collaborators to you repository, **navigate** to the **main page** of the repository and click **Settings**.
1. In the "**Access**" section of the side bar, click **Collaborators & teams**
2. Under **"Manage access"**, click **Add people**
3. In the search field, type the **username or email** of the person you want to add to the repository.
4. Once you found the person you want to add as a collaborator, you can **select** the **role and permissions** the person has on the repo. It is **suggested** that you **add your group members** as **owners** to make susre you all have even access to the repository.

More information about [collaborators](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-teams-and-people-with-access-to-your-repository).

### Step 4: Development

During the development of your software, you will have to perform several tasks. In project 2a, you agreed on how you will distribute these tasks. GitHub has several features that can help you keep track of these, so please make sure to use them.

#### Issues:

Issues in GitHub is one of the most useful features when it comes to progress tracking. The platform allows you to set **Milestones**, which have due dates (very useful if you want to have weekly progress meter). Each **Milestone** can have several tasks called **Issues** in GitHub, which have the descriptions on what needs to be done. 

Issues offer several organizational options that you should use:
1. Issue ID number: Automatically generated by Git. Use these in your commit messages to refer to issues you solved in that merge.
2. **Issue name**: Short name for the issue. Issues are meant to be very atomic, so the names should be something like: "Implement Left Rotation for AVL Tree".
3. Issue description: Detailed description of the issue. This includes potential ideas on how to solve the problem that the issue presents, specific steps to be followed, or details on how the issue was encountered/discovered if this is a bug.
4. **Tags/labels**: Issues can range from new features to discovered bugs, and tags allow you to organize the issues based on the type. You can create new tags/labels to fit your own project needs.
5. Milestones: Adding a milestone for the Issue helps keep team on track because it sets a due date for that particular fix or implementation.
6. **Assignee**: GitHub also offers you to **assign** the Issue to a **particular** **user**. This means that **they are in charge of resolving that issue**, and helps keep track of what tasks need to be done by whom. Make sure to **use this feature** for yourself and your team because it will **help** you **keep track** of **how evenly the work is distributed**.
7. [Tasklists](https://docs.github.com/en/issues/managing-your-tasks-with-tasklists/quickstart-for-tasklists): Each issue can be accompanied by a tasklist that involves steps/ideas on how to solve the problem. For example, this can involve some very high level pseudocode for the solution (e.g. Insert into PageRank: "Check if From page is in map", "Check if To page is in map", "Insert To", "Add From at To").

#### Branches

Once you have the initial tasks distributed as issues in your repo, your development should involve **separate branches** **based** on the **tasks** you do. Making a **branch** means that you **have a safe copy** of the code to work on in a **sandbox** style environment. This ensures that **if you** do something on your branch that **messes** up the **already working code** in the main branch, your **mistake** would **not** **affect** the **main code** and you can start over to ensure you don't encounter the same problem.

To **make** a branch, you open the main page of the repository (Code).
1. Click on the branch (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"></path></svg>) dropdown menu and click **"View all branches"**
2. Create a big green button that says **"New Branch"**
3. Give the branch a descriptive name

To **delete** a branch, open the tab with all branches and click on the bin (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M16 1.75V3h5.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75Zm-6.5 0V3h5V1.75a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25ZM4.997 6.178a.75.75 0 1 0-1.493.144L4.916 20.92a1.75 1.75 0 0 0 1.742 1.58h10.684a1.75 1.75 0 0 0 1.742-1.581l1.413-14.597a.75.75 0 0 0-1.494-.144l-1.412 14.596a.25.25 0 0 1-.249.226H6.658a.25.25 0 0 1-.249-.226L4.997 6.178Z"></path><path d="M9.206 7.501a.75.75 0 0 1 .793.705l.5 8.5A.75.75 0 1 1 9 16.794l-.5-8.5a.75.75 0 0 1 .705-.793Zm6.293.793A.75.75 0 1 0 14 8.206l-.5 8.5a.75.75 0 0 0 1.498.088l.5-8.5Z"></path></svg>) symbol at the end of the line with the branch you want to delete.

#### Commits

Commits are a way to update the repository with the changes you made. Each commit has information about who made the change, what changes were made, when the change was made, and a message that describes the changes (and/or if it refers to an [Issue](#issues)).

Commits are very important part of collaboration and should follow an agreed on convention for the team. Each commit also offers a way to organize the changes because it shows a very short concise description of the change made. As such, make sure to commit frequently and that each commit solves only one issue. As with Issues, your commits should be atomic (contains only one change, e.g. `Feat: implement user input parsing for calculator to split string into tokens (Issue #1)`).

##### Guidelines for good commit messages
1. Keep it **short** (less than 150 characters total)
    - Committing **fewer changes** at a time can help with this
2. Use the **imperative** mood
    - This convention aligns with commit messages generated by commands like git merge and git revert
    - Consistency enhances speed of reading comprehension
    - Tends to be more concise than the other moods
3. Specify the **type of commit** (Link to [ISSUE](#issues)):
    - feat: The new feature you're adding to a particular application
    - fix: A bug fix
    - style: Feature and updates related to styling
    - refactor: Refactoring a specific section of the codebase
    - test: Everything related to testing
    - docs: Everything related to documentation
    - chore: Regular code maintenance.[ You can also use emojis to represent commit types]
4. Remove unnecessary punctuation marks
5. Do not end the subject line with a period
6. Capitalize the subject line and each paragraph
7. Use the body to explain what changes you have made and why you made them.
8. Information in commit messages:
    - **Issue it fixes**
    - **Why** the change was made
    - **Where** the change was made
    - If it's a fix, describe the bug
9.  Be **CONCISE**.

##### Examples of Commit Messages:
- "." - Very Bad (What does this even mean?)
- "m" - Very Bad (Okay?)
- ":)" - Very Bad (I hope your team members understand what this means because I don't)
- "main function" - Bad (What about it?)
- "First commit" - Bad (Congratulations?)
- "Update main.cpp" - Better but still bad (What changed?)
- "added mergesort.h, will add std::chrono later" - A bit better (Future plans shouldn't be the main point of a message. What does this commit change?)
- "removed empty line from bottom of dictionary and updated UI" - Good (But stick to one change per commit)
- "added filter buttons to sort menu" - Very Good (Use imperative mood and capitalize the messages, but the content of the message is excellent)




#### Pull Requests

> "A pull request is a proposal to merge a set of changes from one branch into another. In a pull request, collaborators can review and discuss the proposed set of changes before they integrate the changes into the main codebase. Pull requests display the differences, or diffs, between the content in the source branch and the content in the target branch." [About Pull Requests in GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)

Once you've made commits and are done working on the feature your branch was for, you should make a pull request. A pull request is meant to allow your teammates to review your changes, give you feedback, and the merge all the functional code into one central location (main branch).

#### Undoing Commits, Pushes, Merges, etc.

If you've made a mistake (*happens to the best of us*) in the changes you've made and committed, pushed, or merged, you can undo the majority of those changes using Git CLI. This [guide](https://sethrobertson.github.io/GitFixUm/fixup.html) allows you to interactively navigate through the resources based on the actions you've taken to find the solution for your problem.

## Markdown and README

README files are formatted using Markdown in GitHub. If you're not familiar with Markdown, or if you need some syntax information, you can find syntax and tips in [Markdown resource file](resources/MARKDOWN.md). In addition to README files being formatted using Markdown, you can use the same syntax in your commit messages, your issues, and milestones to format any text.

## Additional Resources and Documentation:
### General Documentation
- [GitHub Docs](https://docs.github.com/en)
- [GitHub Desktop](https://docs.github.com/en/desktop)
- [GitHub Get Started](https://docs.github.com/en/get-started)
- [GitHub Repositories](https://docs.github.com/en/repositories)
- [GitHub Pull Requests](https://docs.github.com/en/pull-requests)
- [GitHub Issues](https://docs.github.com/en/issues)

### Additional Specific Documentation

These sites are specifically referred to in the rest of the documentation provided.

#### Quickstart
- [Git and GitHub Quickstart](https://docs.github.com/en/get-started/start-your-journey)
- [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow)
- [Connecting to GitHub](https://docs.github.com/en/get-started/using-github/connecting-to-github)
- [Communicating on GitHub](https://docs.github.com/en/get-started/using-github/communicating-on-github)
- [Git CLI](https://docs.github.com/en/get-started/using-git/about-git)

#### Repositories
- [Best practices](https://docs.github.com/en/repositories/creating-and-managing-repositories/best-practices-for-repositories)
- [Quickstart](https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories)
- [Creating from Template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
- [READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)
- [Repo visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility)
- [Teams and Collaboration](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-teams-and-people-with-access-to-your-repository)
- [Working with Files](https://docs.github.com/en/repositories/working-with-files)

#### Branches
- [View Branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/viewing-branches-in-your-repository)
- [Rename Branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/renaming-a-branch)
- [Change Default Branch](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/changing-the-default-branch)
- [Delete & Restore Branch](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/deleting-and-restoring-branches-in-a-pull-request)
- [Configuring Pull Requests](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges)

#### Issues
- [Issue Tasklists](https://docs.github.com/en/issues/managing-your-tasks-with-tasklists/quickstart-for-tasklists)

#### Bonus Documentation
- [Planning and Tracking Your Project](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [Undo changes, commits, pushes, etc.](https://sethrobertson.github.io/GitFixUm/fixup.html)
