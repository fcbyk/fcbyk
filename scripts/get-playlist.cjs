// playlist.json，需要浏览器获取歌单的响应对象

const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, '../playlist.json'); // 输入文件路径
const outputFilePath = path.join(__dirname, '../src/configs/json/musicList.json'); // 输出文件路径

fs.readFile(jsonFilePath, 'utf-8', (err, jsonString) => {
  if (err) {
    console.error('读取文件出错:', err);
    return;
  }

  try {
    const data = JSON.parse(jsonString);

    if (!data.playlist?.tracks) {
      throw new Error('JSON 数据缺少 playlist.tracks 字段');
    }

    const songIds = data.playlist.tracks.map(track => track.id);

    // 将 songIds 写入文件
    fs.writeFile(outputFilePath, JSON.stringify(songIds, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('写入文件出错:', writeErr);
      } else {
        console.log(`歌曲 ID 已成功写入 ${outputFilePath}`);
      }
    });

  } catch (parseErr) {
    console.error('解析 JSON 出错:', parseErr.message);
  }
});