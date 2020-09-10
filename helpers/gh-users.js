const { Octokit } = require("@octokit/core");

const octokit = new Octokit();

const getUsers = async (q) => {
    const response = await octokit.request('GET /search/users', { q });
    return response;
}

module.exports = { getUsers };
