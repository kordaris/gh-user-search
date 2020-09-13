# gh-user-search

Implements GitHub User Search using the GitHub REST API. You can see the result active on [this link](https://ghusersearch-kordaris.herokuapp.com/).


## Main Technologies

Since I have experience working with Node.js from backend development mostly, I wanted to try it for this implementation alongside the Express framework. It was a first time experiece using the template engine Pug/Jade, instead of HTML, which I found rather useful.


## GitHub API

* The [Github REST API](https://docs.github.com/en/rest) was used for the implementation and specifically, the search results were received via the [GET /search/users](https://docs.github.com/en/rest/reference/search#search-users) call. For retrieving more data about users (followers/following count, name etc) the [GET /users/{username}](https://docs.github.com/en/rest/reference/users#get-a-user) call was needed. 

* For the utilization of GitHub's REST API, the [octokit](https://github.com/octokit/core.js#readme) library was used, as the documentation suggested.

* The pages' count for pagination were limited to 100 as mentioned in the documentation [here](https://developer.github.com/v3/#pagination).


## Other Tools

* For implementing pagination, the [express-paginate](https://github.com/expressjs/express-paginate) library was used, which was helpful, although there was probably a bug in the module when returning the last page's URL.

* The Bootstrap 4 library was used as a base for UI implementation and responsiveness.

* Heroku was used to deploy the application. In order to avoid the exposure of the GitHub Access Token, the `heroku config` module was used, which adds variables in the `process.env` of node.


## Feature improvement

* Performing two REST API calls for retrieving user data has a slow response and its performance needs to be optimized, probably making the "Get A User" call for less users or seperately for each user.

* Pagination needs improvement, by fixing the last pages' URL and show the first pages too, while nagivating. Also, specific buttons for the first and last page should exist.

* More user data could be shown like description or star count, which would require a UI redesign and another REST API call because the star count is not included in the data returned from either of the calls used.

* The UI could be improved in details
