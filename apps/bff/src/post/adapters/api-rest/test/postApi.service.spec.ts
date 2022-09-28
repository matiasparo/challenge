import { Post, Comment, User } from '../../../domain/models';
import { PostRepository } from '../../../domain/ports/post.repository';
import { PostService } from '../../../domain/ports/post.service';

const commentsMockApi: Comment[] = [
  {
    postId: 2,
    id: 6,
    name: 'et fugit eligendi deleniti quidem qui sint nihil autem',
    email: 'Presley.Mueller@myrl.com',
    body: 'doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in',
  },
  {
    postId: 2,
    id: 7,
    name: 'repellat consequatur praesentium vel minus molestias voluptatum',
    email: 'Dallas@ole.me',
    body: 'maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor',
  },
];

const userMockApi: User = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};

describe('uses_cases/get post detail', () => {
  let postService: PostService;
  let postRepository: PostRepository;
  beforeEach(() => {
    postRepository = {} as PostRepository;
    postRepository.getComment = jest.fn();
    postRepository.getPost = jest.fn();
    postRepository.getUser = jest.fn();

    postService = new PostService(postRepository);
  });

  it('should return a post details', async () => {
    const commentListMock: Comment[] = commentsMockApi.map(
      (comment: Comment) =>
        new Comment(
          comment.postId,
          comment.id,
          comment.name,
          comment.email,
          comment.body,
        ),
    );
    const userMock: User = userMockApi;
    const postMock: Post = new Post(
      1,
      'title',
      'description',
      commentListMock,
      userMock,
    );

    (postRepository.getComment as jest.Mock).mockReturnValue(
      Promise.resolve(commentListMock),
    );
    (postRepository.getUser as jest.Mock).mockReturnValue(
      Promise.resolve(userMock),
    );
    (postRepository.getPost as jest.Mock).mockReturnValue(
      Promise.resolve(postMock),
    );

    const post = await postService.get(1);
    expect(post.title).toEqual(postMock.title);
    expect(post.body).toEqual(postMock.body);
    expect(post.id).toEqual(postMock.id);
    expect(post.user.name).toEqual(postMock.user.name);
    expect(postRepository.getPost as jest.Mock).toBeCalledTimes(1);
    expect(postRepository.getComment as jest.Mock).toBeCalledTimes(1);
    expect(postRepository.getUser as jest.Mock).toBeCalledTimes(1);

    expect(postRepository.getUser as jest.Mock).toHaveBeenCalledWith(
      userMock.id,
    );
    expect(postRepository.getComment as jest.Mock).toHaveBeenCalledWith(
      postMock.id,
    );
    expect(postRepository.getPost as jest.Mock).toHaveBeenCalledWith(
      postMock.id,
    );
  });
});
