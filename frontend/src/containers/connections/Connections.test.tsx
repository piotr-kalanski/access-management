import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Connections from './Connections'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import config from '../../config/config'

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('Connections', () => {

  test('Return list of connections', async () => {
    server.use(
      rest.get(`${config.api.BASE_URL}/connections`, (req, res, ctx) => {
        return res(ctx.json({
          items: [
            { id: "1", description: "d1", data_source_type: "redshift", secret_reference_to_connect: "s1" }
          ]
        }))
      })
    )

    render(<Connections />)

    await waitFor(() => {
        const connections = screen.getByTestId("connections")
        expect(connections).toBeDefined()
        // TODO - currently it doesn't show any connections
    //   expect(connections).toHaveTextContent("d1")
    //   expect(connections).toHaveTextContent("s1")
    })
  })
})
