from dam.model import User
from dam.users.dto import CreateUserRequest
from dam.users.repository import FakeUsersRepository
from dam.users.service import UsersService


def test_create_user():
    # given
    repository = FakeUsersRepository()
    service = UsersService(repository)

    # when
    service.create_user(CreateUserRequest(
        name="user1"
    ))

    # then
    users = service.get_users().items
    assert len(users) == 1
    u = users[0]
    assert u.name == "user1"


def test_remove_user():
    # given
    repository = FakeUsersRepository([
        User(
            id="1",
            name="u1"
        ),
        User(
            id="2",
            name="u2"
        ),
    ])
    service = UsersService(repository)

    # when
    service.delete_user("1")

    # then
    users = service.get_users().items
    assert len(users) == 1
    u = users[0]
    assert u.id == "2"
