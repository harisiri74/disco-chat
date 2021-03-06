'use strict'

import React from 'react'
import Router from 'react-router'
import routes from './routes'
import AppFlux from './flux'
import FluxComponent from 'flummox/component'
import { PrettyError } from './components'

const flux = new AppFlux()

flux.addListener('error', error => setTimeout(() => { throw error }, 0))

try {
  Router.run(routes, (Handler, state) => {
    const routerActions = flux.getActions('router')

    routerActions.changeRoute(Handler, state)

    React.render(
      <FluxComponent flux={flux}>
	      <Handler />
	    </FluxComponent>, 
	    document.getElementById('app-container'),
      function() {
        //console.log('args', arguments)
      }
    )
  })
} catch(e) {
  React.render(<PrettyError e={e} />, document.body)
  throw e
}

// good idea -> bootstrap config
// const config = JSON.parse(window.unescape(document.getElementsByName('config/app')[0].content));
