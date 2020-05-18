import { Request, Response } from "express"

export function addTimezone(timezone = process.env.TZ) {
  return (request: Request, response: Response, next: () => any) => {
    // This query param is required and client cannot alter it
    if (timezone) {
      request.query.timezone = timezone
    }

    next()
  }
}

type Whitelist = {
  [model: string]: string[]
}

type Fields = {
  [model: string]: string
}

export function whitelistFields(
  whitelist: Whitelist,
  warn: boolean | Function = true,
) {
  return (request: Request, response: Response, next: () => any) => {
    if (!request.query.fields) {
      request.query.fields = Object.keys(whitelist).reduce(
        (fields, modelName) => {
          fields[modelName] = whitelist[modelName].join(",")

          return fields
        },
        {} as Fields,
      )

      return next()
    }

    Object.keys(request.query.fields).forEach((modelName) => {
      if (!whitelist[modelName]) {
        delete (request.query.fields as Fields)[modelName]

        warn &&
          (typeof warn === "function" ? warn : console.warn)(
            `model \`${modelName}\` won't be included in the response as it isn't whitelisted`,
          )

        return
      }

      ;(request.query.fields as Fields)[modelName] = (request.query
        .fields as Fields)[modelName]
        .split(",")
        .filter((fieldName) => {
          if (whitelist[modelName].includes(fieldName)) {
            return true
          }

          warn &&
            (typeof warn === "function" ? warn : console.warn)(
              `field \`${modelName}.${fieldName}\` won't be included in the response as it isn't whitelisted`,
            )
        })
        .join(",")
    })

    next()
  }
}
