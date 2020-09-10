const { Octokit } = require("@octokit/core");

const octokit = new Octokit({ auth: `9d646433457ef9d5819d62644cfb76ca54611890` });

const getUsers = async (q) => {
    const response = await octokit.request('GET /search/users', { q });
    return response;
}



module.exports = { getUsers };
