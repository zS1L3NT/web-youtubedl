import { Type } from "arktype"
import { NextFunction, Request, Response } from "express"

import logger from "./logger.js"

const queue: number[] = []

export type iRoute = new (req: Request, res: Response) => Route

export abstract class Route<BV = never, QV = never> {
	constructor(
		protected readonly req: Request,
		protected readonly res: Response,
	) {}

	setup() {
		queue.push(queue.length === 0 ? 1 : queue.at(-1)! + 1)
		const rid = `{#${queue.at(-1)!}}`

		logger.http(`Opening ${rid}`, this.req.method, this.req.url, this.req.body)

		if (this.bodyValidator) {
			const result = this.bodyValidator(this.req.body)
			if (result.problems) {
				this.res.status(400).send({
					message: "Body Validation Errors",
					errors: result.problems,
				})
				return
			}
		}

		if (this.queryValidator) {
			const result = this.queryValidator(this.req.query)
			if (result.problems) {
				this.res.status(400).send({
					message: "Body Validation Errors",
					errors: result.problems,
				})
				return
			}
		}

		let handle = this.handle.bind(this)

		for (const Middleware of this.middleware.reverse()) {
			handle = () => new Middleware(this.req, this.res).handle(handle)
		}

		handle()
			.catch(err => {
				logger.error(err)
				this.res.status(500).send(err)
			})
			.finally(() => {
				setTimeout(() => queue.splice(queue.indexOf(+rid.slice(2, -1)), 1), 60_000)

				logger.http(`Closing ${rid}`, this.req.method, this.req.url, this.req.body)
			})
	}

	bodyValidator: Type<BV> | undefined

	queryValidator: Type<QV> | undefined

	middleware: iMiddleware[] = []

	abstract handle(): Promise<void>

	get body(): BV {
		return this.req.body as BV
	}

	get query(): QV {
		return this.req.query as QV
	}

	get params() {
		return this.req.params as Record<string, string>
	}

	respond(data: any, status = 200) {
		this.res.status(status).send(data)
	}

	throw(message: string, status = 400) {
		this.res.status(status).send({ message })
	}

	redirect(url: string) {
		this.res.redirect(url)
	}
}

export type iMiddleware = new (req: Request, res: Response) => Middleware

export abstract class Middleware {
	constructor(
		protected readonly req: Request,
		protected readonly res: Response,
	) {}

	abstract handle(next: NextFunction): Promise<void>

	respond(data: any, status = 200) {
		this.res.send({
			data,
			status,
		})
	}

	throw(message: string, status = 400) {
		this.res.send({
			data: {
				message,
			},
			status,
		})
	}

	redirect(url: string) {
		this.res.redirect(url)
	}
}
