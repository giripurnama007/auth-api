const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    const mockThreadRepository = new ThreadRepository();
    const mockReturnAddedThread = new AddedThread({
      id: 'thread-123',
      title: 'title',
      owner: 'user-123',
    });

    mockThreadRepository.addThread = jest.fn(() => Promise.resolve(mockReturnAddedThread));
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });
    const useCasePayload = {
      title: 'title',
      body: 'body',
      owner: 'user-123',
    };
    const mockAddedThread = new AddedThread({
      id: 'thread-123',
      title: 'title',
      owner: 'user-123',
    });

    const addedThread = await addThreadUseCase.execute(useCasePayload);
    expect(addedThread).toStrictEqual(mockAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(useCasePayload);
  });
});
