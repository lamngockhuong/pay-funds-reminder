import _ from 'lodash'
import pug from 'pug'
import config from '../config'
import * as chatwork from '../../dist/utils/chatwork'
import * as googleSheetsService from './googleSheetsService'

const spreadsheetId = config.app.SPREAD_SHEET_ID

const getUnpaidFundMembers = (sheetData) => {
  let unpaidFundList = []

  try {
    let isFoundPayFundList = false

    _.forEach(sheetData, (value) => {
      if (!isFoundPayFundList) {
        _.forEach(value, (cell, col) => {
          if (cell === 'Chatwork ID' && col === 3) {
            isFoundPayFundList = true
          }
        })
      } else {
        // 1: STT, 2: Quỹ, 3: Chatwork ID, 4: Số tiền * 1000, 5: Ngày, 6: Note
        if (value[4] === undefined) {
          unpaidFundList.push({chatworkId: value[3], name: value[2]})
        }
      }
    })
  } catch(error) {
    console.log(error.message, error.stack)
  }

  return unpaidFundList
}

const createChatworkRemindMessage = (members = []) => {
  let to = ''
  _.forEach(members, (member) => {
    to += `[To:${member.chatworkId}] ${member.name}\n`
  })
  const compiledFunction = pug.compileFile(process.cwd() + '/src/templates/to-unpaid-fund-members.pug')

  return compiledFunction({
    to: to,
    month: '04/2020'
  })
}

export const remind = async (sheetName) => {
  try {
    const auth = await googleSheetsService.getAuthToken()
    const response = await googleSheetsService.getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth
    })

    let unpaidFundMembers = getUnpaidFundMembers(response.data.values)
    let message = createChatworkRemindMessage(unpaidFundMembers)
    console.log(message)
    await chatwork.sendMessage(message)
  } catch(error) {
    console.log(error.message, error.stack)
  }
}
