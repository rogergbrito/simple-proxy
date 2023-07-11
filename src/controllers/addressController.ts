import axios from 'axios';
import { Request, Response } from 'express';

const instance = axios.create({
  baseURL: 'https://viacep.com.br',
  timeout: 1000,
  data: {},
  headers: {},
})

class addressController {
  async getAddress(req: Request, res: Response) {
    const cep = req.params.cep;

    try {
      await instance.get(`/ws/${cep}/json`)
      .then(response => {
        console.log(response.data);
        return res.status(200).json(response.data);
      }).catch(err => {
        console.log(err);
        return res.status(400).json({ error: "Bad Resquest" });
      });
      } catch (error) {
          res.status(400).json({ msg: "Proxy error" });
          console.log(error);
    }
  }
}

export default new addressController();