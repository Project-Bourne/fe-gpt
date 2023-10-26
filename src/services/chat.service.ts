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

  static async contextChat(id,data) {
    try {
      const response = await request(
        `deepchat/${id}`,
        'PUT',
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


  static async getHistory(page=1) {
    try {
      const response = await request(
        `deepchat?page=${page}`,
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
  static async deleteHistory(id) {
    try {
      const response = await request(
        `deepchat/${id}`,
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
