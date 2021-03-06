const { google, github } = require('../third-party/strategy/middleware/platforms-middleware');
const authPlatformMiddleware = require('../middleware/auth-platform-middleware');
const { authCheckerMiddleware } = require('../middleware/auth-checker-middleware');
const { homeHandler } = require('../handlers/home-handler');
const {
  postsHandler,
  postsByCategoryHandler,
  postCreateHandler,
  postCreateProcessHandler,
  postCompleteHandler,
} = require('../handlers/posts-handler');
const { educationHandler } = require('../handlers/education-handler');
const { logoutHandler, authPlatformSuccessHandler } = require('../handlers/auth-handler');
const { pageNotFoundHandler } = require('../handlers/error-page-handler');

const Routes = {
  set: (route) => {
    route.get('/', homeHandler);
    route.get('/home', homeHandler);
    route.get('/posts', postsHandler);
    route.get('/posts/category/:categoryName', postsByCategoryHandler);
    route.get('/post/create', authCheckerMiddleware, postCreateHandler);
    route.post('/post/create', authCheckerMiddleware, postCreateProcessHandler);
    route.get('/post/:postId/complete', postCompleteHandler);
    route.get('/edu/tips-dan-trik', educationHandler);
    route.get('/auth/google', authPlatformMiddleware, google.request);
    route.get('/auth/github', authPlatformMiddleware, github.request);
    route.get('/logout', logoutHandler);
    route.get('/:any/logout', logoutHandler);
    route.get('/auth/success', authPlatformSuccessHandler);
    route.get('/google/callback', google.verify);
    route.get('/github/callback', github.verify);

    /**
     * plurals route redirect and sensitive url path handler
     */
    route.get('/post', (req, res) => res.redirect('/posts'));
    route.get('/posts/', (req, res) => res.redirect('/posts'));
    route.get('/posts/create', (req, res) => res.redirect('/post/create'));
    route.get('/posts/category', (req, res) => res.redirect('/posts'));
    route.get('/posts/category/', (req, res) => res.redirect('/posts'));
    route.get('/edu', (req, res) => res.redirect('/edu/tips-dan-trik'));
    route.get('/edu/', (req, res) => res.redirect('/edu/tips-dan-trik'));

    route.use('/', pageNotFoundHandler);
  },
};

module.exports = Routes;
