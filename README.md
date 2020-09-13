# gh-user-search

Implements GitHub User Search using GitHub REST API.


## Main Technologies

Since I have experience with Node.js from backend development mostly, I wanted to try it for this implementation alongside Express framework. It was a first time experiece using template engine Pug/Jade, instead of HTML, which I found rather useful.


## GitHub API

* The [Github REST API](https://docs.github.com/en/rest) was used for the implementation and specifically, the search results were received via the [GET /search/users](https://docs.github.com/en/rest/reference/search#search-users) call. For retrieving more data from users (followers/following count, name etc) it was needed to use the [GET /users/{username}](https://docs.github.com/en/rest/reference/users#get-a-user) call. 

* For the utilization of GitHub's REST API, the [octokit](https://github.com/octokit/core.js#readme) library was used, as the documentation suggested.

* The pages' count for pagination were limited to 100 as mentioned in the documentation [here](https://developer.github.com/v3/#pagination).


## Other Tools

* For implementing pagination, the [express-paginate](https://github.com/expressjs/express-paginate) library was used, which was helpful, although there was probably a bug in the module when returning the last page's URL.

* The Bootstrap 4 library was used as a base for UI implementation and responsiveness.


## Feature improvement

* Performing two REST API calls for retrieving user data has a slow response and its performance needs to be optimized, probably making the "Get A User" call for less users or seperately for each user.

* Pagination needs improvement, by fixing the last pages' URL and show the first pages too, while nagivating. Also, specific buttons for the first and last page should exist.

* My personal VM which was used for deploying the project runs Ubuntu 16.04 LTS 32-bit OS and was not possible to install Node.js version greater than v9.11.2, therefore some JS changes needed to be done in code. The VM OS could be upgraded in order to run latest Node versions. 

* More user data could be shown like description or star count, which would require a UI redesign and another REST API call because the star count is not included in the data returned from either of the calls used.

* The UI could be improved in details
