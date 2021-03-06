import React from 'react'
import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'
import { ethers } from 'ethers'
import utc from 'dayjs/plugin/utc'
import { blockClient } from '../apollo/client'
import { GET_BLOCK } from '../apollo/queries'
import { Text } from 'rebass'

BigNumber.set({ EXPONENTIAL_AT: 50 })

dayjs.extend(utc)

export const toNiceDate = date => {
  // let df = new Date(date * 1000).toUTCString('MMMM DD')
  let x = dayjs.utc(dayjs.unix(date)).format('MMM DD')
  return x
}

export async function getBlockFromTimestamp(timestamp) {
  let result = await blockClient.query({
    query: GET_BLOCK,
    variables: {
      timestamp: timestamp
    },
    fetchPolicy: 'cache-first'
  })
  return result?.data?.blocks?.[0]?.number
}

export const toNiceDateYear = date => dayjs.utc(dayjs.unix(date)).format('MMMM DD, YYYY')

export const isAddress = value => {
  try {
    return ethers.utils.getAddress(value.toLowerCase())
  } catch {
    return false
  }
}

export const toK = (num, fixed, cutoff = false) => {
  const formatter = divideBy =>
    fixed === true
      ? cutoff
        ? Number(num / divideBy).toFixed(0)
        : Number(num / divideBy).toFixed(4)
      : Number(num / divideBy)
  if (num > 999999 || num < -999999) {
    return `${formatter(1000000)}M`
  } else if (num > 999 || num < -999) {
    return `${formatter(1000)}K`
  } else {
    return formatter(1)
  }
}

export const setThemeColor = theme => document.documentElement.style.setProperty('--c-token', theme || '#333333')

export const Big = number => new BigNumber(number)

export const urls = {
  showTransaction: tx => `https://etherscan.io/tx/${tx}/`,
  showAddress: address => `https://www.etherscan.io/address/${address}/`,
  showToken: address => `https://www.etherscan.io/token/${address}/`,
  showBlock: block => `https://etherscan.io/block/${block}/`
}

export const formatTime = unix => {
  const now = dayjs()
  const timestamp = dayjs.unix(unix)

  const inSeconds = now.diff(timestamp, 'second')
  const inMinutes = now.diff(timestamp, 'minute')
  const inHours = now.diff(timestamp, 'hour')
  const inDays = now.diff(timestamp, 'day')

  if (inHours >= 24) {
    return `${inDays} ${inDays === 1 ? 'day' : 'days'} ago`
  } else if (inMinutes >= 60) {
    return `${inHours} ${inHours === 1 ? 'hour' : 'hours'} ago`
  } else if (inSeconds >= 60) {
    return `${inMinutes} ${inMinutes === 1 ? 'minute' : 'minutes'} ago`
  } else {
    return `${inSeconds} ${inSeconds === 1 ? 'second' : 'seconds'} ago`
  }
}

export const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// using a currency library here in case we want to add more in future
var priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export const formattedNum = (number, usd = false) => {
  if (isNaN(number) || number === '' || number === undefined) {
    return ''
  }
  let num = parseFloat(number)
  if (num === 0) {
    if (usd) {
      return '$0'
    }
    return 0
  }

  if (num < 0.0001) {
    return usd ? '< $0.0001' : '< 0.0001'
  }

  if (usd) {
    if (num < 0.01) {
      if (usd) {
        return '$' + Number(parseFloat(num).toFixed(4))
      }
      return Number(parseFloat(num).toFixed(4))
    }
    let usdString = priceFormatter.format(num)
    return '$' + usdString.slice(1, usdString.length)
  }

  if (num > 1000) {
    return (usd ? '$' : '') + Number(parseFloat(num).toFixed(0)).toLocaleString()
  }

  return Number(parseFloat(num).toFixed(4))
}

export function formattedPercent(percent) {
  if (!percent) {
    return '0%'
  }

  if (percent < 0.0001 && percent > 0) {
    return <Text color="green">{'< 0.0001%'}</Text>
  }

  if (percent < 0 && percent > -0.0001) {
    return <Text color="red">{'< 0.0001%'}</Text>
  }

  let fixedPercent = percent.toFixed(2)
  if (fixedPercent === '0.00') {
    return '0%'
  }
  if (fixedPercent > 0) {
    return <Text color="green">{`+${fixedPercent}%`}</Text>
  } else {
    return <Text color="red">{`${fixedPercent}%`}</Text>
  }
}

export const get2DayPercentChange = (valueNow, value24HoursAgo, value48HoursAgo) => {
  // get volume info for both 24 hour periods
  let firstDayValue = value24HoursAgo - value48HoursAgo
  let secondDayValue = valueNow - value24HoursAgo

  const adjustedPercentChange = (parseFloat(secondDayValue - firstDayValue) / parseFloat(firstDayValue)) * 100

  if (isNaN(adjustedPercentChange) || !isFinite(adjustedPercentChange)) {
    return [secondDayValue, 0]
  }
  return [secondDayValue, adjustedPercentChange]
}

export const getPercentChange = (valueNow, value24HoursAgo) => {
  const adjustedPercentChange = ((valueNow - value24HoursAgo) / value24HoursAgo) * 100
  if (isNaN(adjustedPercentChange)) {
    return 0
  }
  return adjustedPercentChange
}

export function isEquivalent(a, b) {
  var aProps = Object.getOwnPropertyNames(a)
  var bProps = Object.getOwnPropertyNames(b)
  if (aProps.length !== bProps.length) {
    return false
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i]
    if (a[propName] !== b[propName]) {
      return false
    }
  }
  return true
}
