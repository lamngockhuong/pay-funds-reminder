import { google } from 'googleapis'

const sheets = google.sheets('v4')

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

export const getAuthToken = async () => {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES
  })

  return await auth.getClient()
}

export const getSpreadSheet = async ({spreadsheetId, auth}) => {
  return await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
  })
}

export const getSpreadSheetValues = async ({spreadsheetId, auth, sheetName}) => {
  return await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName
  })
}
