// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)


// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  var idd = api.indexOf('_async')
  if (idd !== -1) api = api.slice(0, idd)

  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }
  if (idd === -1) {
    // Run each plugin in series.
    // eslint-disable-next-line no-undef
    let results = plugins.map(plugin => {
      if (!plugin.plugin[api]) {
        return undefined
      }
      const result = plugin.plugin[api](args, plugin.options)
      if (result && argTransform) {
        args = argTransform({ args, result })
      }
      return result
    })

    // Filter out undefined results.
    results = results.filter(result => typeof result !== `undefined`)

    if (results.length > 0) {
      return results
    } else {
      return [defaultReturn]
    }
  } else {
    var result = plugins.reduce(
      (previous, next) =>
        next.plugin[api]  ? previous.then(() => {
          const result =  next.plugin[api](args, next.options)
      if (result && argTransform) {
        args = argTransform({ args, result })
      }
      return result
          }) : previous,
      Promise.resolve()
    )
    return result
  }
}

/*
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}*/
