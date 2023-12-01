const {
  saveFile,
  deleteFile,
  removeFolder
} = require('../../utils/files/saveFile')

const { saveAndConvert } = require('../../utils/files/saveAndConvert');

const {
  createNewVenchel,
  getAllVenchels,
  removeVenchel,
} = require("../../Database/VenchelQuery/VenchelQuery")

const sendResponseWithData = (res, data) => {
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

const handleError = (res, error) => {
  console.log('handleError', error);
  res.statusCode = 500;
  res.end(JSON.stringify({
    error: error
  }));
};

class VenchelControler {
  async addNewVenchel(req, res) {
    try {
      const authDecodeUserData = req.user
      const postPayload = authDecodeUserData.payLoad
      const fields = postPayload.fields;
      
      await createNewVenchel(fields)
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify('Status venchel created'))
      res.end()

    } catch (error) {
      handleError(res, 'addNewVenchel')
    }
  }
  async getAllVenchels(req, res) {
    try {
      const authDecodeUserData = req.user
      const data = await getAllVenchels()
      sendResponseWithData(res, data)
    } catch (error) {
      handleError(res, 'getAllVenchels')
    }
  }
  async removeVenchel(req, res) {
    try {
      const authDecodeUserData = req.user
      const postPayload = authDecodeUserData.payLoad
      const fields = postPayload.fields;
      console.log('removeNewVenchel', fields.task_id)
      await removeVenchel(fields.task_id)
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify('Status venchel removed'))
      res.end()
    } catch (error) {
      
    }
  }
}

module.exports = new VenchelControler()