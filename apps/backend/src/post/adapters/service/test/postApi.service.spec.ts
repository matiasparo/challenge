import { Post } from '../../../domain/model';
import { PostRepository } from '../../../domain/ports/post.repository';
import { PostService } from '../../../domain/ports/post.service';

describe('uses_cases/create post', () => {
  let postService: PostService;
  let postRepository: PostRepository;
  beforeEach(() => {
    postRepository = {} as PostRepository;
    postRepository.create = jest.fn();

    postService = new PostService(postRepository);
  });

  it('should create a post', async () => {
    const postToSave = new Post('title', 'content', 1, 1);
    (postRepository.create as jest.Mock).mockReturnValue(
      Promise.resolve(postToSave),
    );
    const post = await postService.create('title', 'content', 1);
    expect(post.title).toBeDefined();
    expect(post.body).toBeDefined();
    expect(post.id).toBeDefined();
    expect(postRepository.create as jest.Mock).toBeCalledTimes(1);
  });
});

describe('uses_cases/get post', () => {
  let postService: PostService;
  let postRepository: PostRepository;
  beforeEach(() => {
    postRepository = {} as PostRepository;
    postRepository.get = jest.fn();

    postService = new PostService(postRepository);
  });

  it('should get a post', async () => {
    const postId = 1;
    const postGet = new Post('title', 'content', 1, postId);

    (postRepository.get as jest.Mock).mockReturnValue(Promise.resolve(postGet));
    const post = await postService.get(postId);
    expect(post.title).toEqual('title');
    expect(post.body).toEqual('content');
    expect(post.id).toEqual(postId);
    expect(postRepository.get as jest.Mock).toBeCalledTimes(1);
  });

  it('should return an error', async () => {
    const postId = 1;

    (postRepository.get as jest.Mock).mockRejectedValue(new Error('error'));
    await expect(postService.get(postId)).rejects.toThrow(new Error('error'));
    expect(postRepository.get as jest.Mock).toBeCalledTimes(1);
  });
});

describe('uses_cases/delete post', () => {
  let postService: PostService;
  let postRepository: PostRepository;
  beforeEach(() => {
    postRepository = {} as PostRepository;
    postRepository.delete = jest.fn();

    postService = new PostService(postRepository);
  });

  it('should delete a post', async () => {
    const postId = 1;

    (postRepository.delete as jest.Mock).mockReturnValue(Promise.resolve(true));
    const isPostDeleted = await postService.delete(postId);
    expect(isPostDeleted).toBeTruthy();
    expect(postRepository.delete as jest.Mock).toBeCalledTimes(1);
  });
});

describe('uses_cases/getAll post', () => {
  let postService: PostService;
  let postRepository: PostRepository;
  beforeEach(() => {
    postRepository = {} as PostRepository;
    postRepository.findAll = jest.fn();

    postService = new PostService(postRepository);
  });

  it('should get all post', async () => {
    const listPost = [
      {
        userId: 1,
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
      },
      {
        userId: 1,
        id: 3,
        title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
      },
    ];
    (postRepository.findAll as jest.Mock).mockReturnValue(
      Promise.resolve(listPost),
    );
    const allPost = await postService.findAll();
    expect(allPost).toHaveLength(listPost.length);
    expect(postRepository.findAll as jest.Mock).toBeCalledTimes(1);
  });
});
