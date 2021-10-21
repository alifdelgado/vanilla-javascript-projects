const postsContainer = document.getElementById('posts-container');
const loading = document.getElementById('loader');
const filter = document.getElementById('filter');
let limit = 5;
let page = 1;

const getPosts = async () => {
    return await (await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)).json();
};

const showPosts = async () => {
    const posts = await getPosts();
    posts.forEach(post => {
        const element = document.createElement('div');
        element.classList.add('post');
        element.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>`;
        postsContainer.appendChild(element);
    });
};

const showLoading = () => {
    loading.classList.add('show');
    setTimeout(() => {
        loading.classList.remove('show');
        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 1000);
};

const filterPosts = (e) => {
    const term = e.target.value.toUpperCase();
    const posts = document.getElementsByClassName('post');
    for(let post of posts) {
        const title = post.getElementsByClassName('post-title')[0].innerText.toUpperCase();
        const body = post.getElementsByClassName('post-body')[0].innerText.toUpperCase();
        if (title.indexOf(term)> -1 || body.indexOf(term)> -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    }
};

showPosts();

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

filter.addEventListener('input', filterPosts);