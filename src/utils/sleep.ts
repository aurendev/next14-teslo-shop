

export const sleep = (seconds: number = 3) => {

  return new Promise((resolve)=> {

    setTimeout(() => {
      resolve(true)
    }, seconds * 1000);
  })

}