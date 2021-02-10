export const imageExtensions = [
  'jpg',
  'gif',
  'png',
]

/**
 * When scanning library, 
 * does not process these files
 * 
 * use with `new RegExp(item)`
 */
export const ignoreFileNames = [
  '.*readme.*',
  '.*info.*'
]


/**
 * When scanning library,
 * skip these directories. (simialr to .plexignore)
 */
export const ignoreScanNames = [
  
]