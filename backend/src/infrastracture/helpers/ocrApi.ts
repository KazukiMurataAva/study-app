const sleep = require('util').promisify(setTimeout)
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials

/**
 * 認証情報
 */
const key = process.env.VISIONAI_KEY || ''
const endpoint = process.env.VISIONAI_ENDPOINT || ''

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);

export const fetchReadApiUseCase = async() => {
  // パスにある画像をアップロードする
  // The URL can point to image files (.jpg/.png/.bmp) or multi-page files (.pdf, .tiff).
  // const printedTextSampleURL = 'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/printed_text.jpg'
  const printedTextSampleURL = 'https://kyoiku.sho.jp/wp-content/uploads/2020/09/067c8736ef29a56e2e2b1af8f5e79b35-1024x768.jpg';

  // Recognize text in printed image from a URL
  console.log('Read printed text from URL...', printedTextSampleURL.split('/').pop());
  const printedResult = await readTextFromURL(computerVisionClient, printedTextSampleURL);
  const resultText: any = await printRecText(printedResult)
  return resultText
}

// Perform read and await the result from URL
const readTextFromURL = async(client: any, url: string) => {
  // To recognize text in a local image, replace client.read() with readTextInStream() as shown:
  let result = await client.read(url);
  // Operation ID is last path segment of operationLocation (a URL)
  let operation = result.operationLocation.split('/').slice(-1)[0];

  // Wait for read recognition to complete
  // result.status is initially undefined, since it's the result of read
  while (result.status !== "succeeded") { await sleep(1000); result = await client.getReadResult(operation); }
  return result.analyzeResult.readResults; // Return the first page of result. Replace [0] with the desired page if this is a multi-page file such as .pdf or .tiff.
}

// Prints all text from Read result
const printRecText = async(readResults: any) => {
  const responseArray: any[] = []
  for (const page in readResults) {
    if (readResults.length > 1) {
      console.log(`==== Page: ${page}`);
    }
    const result = readResults[page]
    if (result.lines.length) {
      for (const line of result.lines) {
        const wordProps = {
          boundingBox: line.boundingBox,
          text: line.text
        }
        responseArray.push(wordProps)
      }
    }
    else { console.log('No recognized text.'); }
  }
  console.log(responseArray)
  return responseArray
}
  