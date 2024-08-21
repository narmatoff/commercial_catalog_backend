import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { fileDirectory } from '../model/const';

export const getFile = async (
  url: string,
  fileName: string,
): Promise<string> => {
  const filePath = path.resolve(fileDirectory, '..', 'files', fileName);

  try {
    const response = await axios.get(url, {
      responseType: 'stream',
    });

    if (!fs.existsSync(path.resolve(fileDirectory, '..', 'files'))) {
      fs.mkdirSync(path.resolve(fileDirectory, '..', 'files'));
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    return filePath;
  } catch (error) {
    console.error('Ошибка при загрузке файла:', error.message);
    throw new Error('Не удалось скачать файл');
  }
};
