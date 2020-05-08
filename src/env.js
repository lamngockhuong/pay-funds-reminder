import dotenv from 'dotenv'
import path from 'path'

/**
 * Initialize environment variables.
 */
dotenv.config({path: path.join(path.resolve(__dirname), '../.env')})
