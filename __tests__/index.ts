import { addTimezoneMiddleware, whitelistFields } from "../src/index"

describe("addTimezoneMiddleware", () => {
  it("constantly overwrites the query timezone", () => {
    const expectedTz = "Europe/Paris"
    const middleware = addTimezoneMiddleware(expectedTz)
    const req: any = { query: { timezone: "US/Pacific" } }

    middleware(req, {} as any, () => {})

    expect(req.query.timezone).toBe(expectedTz)
  })
})

describe("whitelistFields", () => {
  it("removes non-whitelisted fields from query params and executes warning function for each field removed", () => {
    const whitelist = {
      user: ["fullName", "age", "gender"],
      room: ["number", "name", "size"],
    }
    const warnings: string[] = []
    const warn = (msg: string) => warnings.push(msg)
    const middleware = whitelistFields(whitelist, warn)
    const req: any = {
      query: {
        fields: {
          user: "fullName,fullAddress",
          room: "number,name,rent",
          city: "name,postalCode",
        },
      },
    }

    middleware(req, {} as any, () => {})

    expect(req.query.fields).toEqual({
      user: "fullName",
      room: "number,name",
    })
    expect(warnings).toMatchSnapshot()
  })

  it("turns the whitelist into `fields` query params when absent from the query", () => {
    const whitelist = {
      user: ["fullName", "age", "gender"],
      room: ["number", "name", "size"],
    }
    const middleware = whitelistFields(whitelist)
    const req: any = { query: {} }

    middleware(req, {} as any, () => {})

    expect(req.query).toEqual({
      fields: {
        user: "fullName,age,gender",
        room: "number,name,size",
      },
    })
  })
})
