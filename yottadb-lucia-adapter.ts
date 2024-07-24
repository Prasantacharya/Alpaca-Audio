import type {
	Adapter,
	DatabaseSession,
	RegisteredDatabaseSessionAttributes,
	DatabaseUser,
	RegisteredDatabaseUserAttributes,
	UserId
} from "lucia";
import {server, mglobal, mclass} from 'mg-dbx-napi';

interface UserDoc extends RegisteredDatabaseUserAttributes {
	_id: UserId;
	__v?: any;
}

interface SessionDoc extends RegisteredDatabaseSessionAttributes {
	_id: string;
	__v?: any;
	user_id: UserId;
	expires_at: Date;
}

export class YottaDBAdapter implements Adapter {
	private Session: Map<BigInteger, string>;
	private User: mglobal;

	constructor(User: mglobal) {
		this.Session = new Map();
		this.User = User;
	}

	public async deleteSession(sessionId: string): Promise<void> {
		// TODO
	}

	public async deleteUserSessions(userId: UserId): Promise<void> {
		// TODO
	}

	public async getSessionAndUser(
		sessionId: string
	): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
		// TODO 
		

		const session : DatabaseSession = {
			userId : "",
			expiresAt: new Date(),
			id: "",
			attributes: [""]
		};
		const user = transformIntoDatabaseUser();
		return [session, user];
	}

	public async getUserSessions(userId: UserId): Promise<DatabaseSession[]> {
		const sessions = await this.Session.find(
			
		).toArray();

		return sessions.map((val) => transformIntoDatabaseSession(val));
	}

	public async setSession(session: DatabaseSession): Promise<void> {
		const value: SessionDoc = {
			_id: session.id,
			user_id: session.userId,
			expires_at: session.expiresAt,
			...session.attributes
		};

		// TODO
		await this.Session.insertOne(value);
	}

	public async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
		// TODO
		await this.Session.findOneAndUpdate(
			{ _id: sessionId },
			{ $set: { expires_at: expiresAt } }
		);
	}

	public async deleteExpiredSessions(): Promise<void> {
		// TODO
		await this.Session.deleteMany({
			expires_at: {
				$lte: new Date()
			}
		});
	}
}

function transformIntoDatabaseUser(value: UserDoc): DatabaseUser {
	// TODO
	delete value.__v;
	const { _id: id, ...attributes } = value;
	return {
		id,
		attributes
	};
}

function transformIntoDatabaseSession(value: SessionDoc): DatabaseSession {
	// TODO
	delete value.__v;
	const { _id: id, user_id: userId, expires_at: expiresAt, ...attributes } = value;
	return {
		id,
		userId,
		expiresAt,
		attributes
	};
}