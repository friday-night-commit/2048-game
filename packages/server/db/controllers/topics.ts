import User from '../models/user.model';
import Topic, { ITopic } from '../models/topic.model';

async function createTopic(
  title: string,
  text: string,
  userId: number
): Promise<Topic | null> {
  return await Topic.create({ title, text, userId });
}

async function updateTopicById(topic: ITopic): Promise<[affectedCount: number]> {
  return await Topic.update(topic, { where: { id: topic.id } });
}

async function deleteTopicById(id: number): Promise<number> {
  return await Topic.destroy({ where: { id } });
}

async function getTopicById(id: number): Promise<Topic | null> {
  return await Topic.findOne({ where: { id } });
}

async function getAllTopics(): Promise<Topic[]> {
  return await Topic.findAll({
    include: { model: User, required: true }
  });
}

export default {
  createTopic,
  updateTopicById,
  deleteTopicById,
  getTopicById,
  getAllTopics
};
