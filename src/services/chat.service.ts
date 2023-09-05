import { request } from '@/hooks/api';

class ChatService {

  static async firstChat(data) {
    try {
      const response = await request(
        'deepchat',
        'POST',
        data,
        true,
        false,
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
 
  static async getChat(id) {
    try {
      const response = await request(
        `deepchat/${id}`,
        'GET',
        {},
        true,
        false,
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async chat(id,data) {
    try {
      const response = await request(
        `deepchat/${id}`,
        'POST',
        data,
        true,
        false,
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }


  static async getHistory() {
    try {
      const response = await request(
        `deepchat`,
        'GET',
        {},
        true,
        false,
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  static async deleteHistory() {
    try {
      const response = await request(
        `deepchat/`,
        'DELETE',
        {},
        true,
        false,
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

// Export the Service class.
export default ChatService;
