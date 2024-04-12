const form = document.querySelector('#github-form');

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', searchGitUser);
  console.log(searchGitUser);
});

//function to Get user information
let searchGitUser = (e)=>{
e.preventDefault();
const user= document.querySelector("#search").value;
fetch(`https://api.github.com/search/users?q=${user}`)
.then(resp => resp.json())
.then(users=>{
  renderUserDetails(users.items)
})
.catch((error)=>{
  alert(error.message)
})
}

//function to render user details
let renderUserDetails = (users)=>{
  users.forEach(user=>{
    createGitUserElement(user)
  })
}

//function to create git user card element

let createGitUserElement = (user)=>{
  const gitUserCard = document.createElement('div');
  gitUserCard.className = 'user-card';
  document.querySelector('#user-list').appendChild(gitUserCard);
  gitUserCard.innerHTML = `<img src="${user.avatar_url}" >
    <h2>${user.login}</h2>
    <a class="fs11" href="${user.html_url}" target="_blank">Go to Github Profile</a><br>
    <button class="submit-btn fs11">View ${user.login}'s Repos</button>
    `
    gitUserCard.querySelector(".submit-btn").addEventListener('click', () => {
      fetchRepo(user)
    })
};

//function to fetch repositories
let fetchRepo=(user)=>{
  fetch(`https://api.github.com/users/${user.login}/repos`)
 .then(resp => resp.json())
 .then(repos => {
    renderRepositoryDetails(repos)
  })
  .catch(error => { alert(error.message) });
}

//function to render repository details
let renderRepositoryDetails = (repos)=>{
  repos.forEach(repo=>{
    createGitRepoElement(repo)
  })
}

//function to create git repo card element
let createGitRepoElement = (repo)=>{
  const gitRepoCard = document.createElement('div');
  gitRepoCard.className = 'repo-card';
  document.querySelector('#repo-list').appendChild(gitRepoCard);
  gitRepoCard.innerHTML = `<img src="${repo.owner.avatar_url}" >
    <h2>${repo.name}</h2>
    <a class="fs11" href="${repo.html_url}" target="_blank">Go to Github Repository</a><br>
    <button class="submit-btn fs11">View ${repo.name}'s Issues</button>
    `
    
};

