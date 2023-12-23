import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

export const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${sec} second`));
    }, sec * 1000);
  });
};

export const AJAX = async function (url, recipeData = undefined) {
  try {
    const fetchPro = recipeData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recipeData),
        })
      : fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok) throw Error(`${data.message} ${response.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// export const getJson = async function (url) {
//   try {
//     const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     console.log(response);
//     const data = await response.json();
//     console.log(data);
//     if (!response.ok) throw Error(`${data.message} ${response.status}`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJson = async function (url, recipeData) {
//   try {
//     const response = await Promise.race([
//       fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(recipeData),
//       }),
//       timeout(TIMEOUT_SEC),
//     ]);
//     console.log(response);
//     const data = await response.json();
//     console.log(data);
//     if (!response.ok) throw Error(`${data.message} ${response.status}`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
