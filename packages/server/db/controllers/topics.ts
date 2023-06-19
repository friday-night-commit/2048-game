import Topic, { ITopic } from '../models/topic.model';

async function createTopic(
  title: string,
  text: string,
  userId: number
): Promise<ITopic | null> {
  return Topic.create({ title, text, userId });
}

async function updateTopicById(topic: ITopic) {
  return Topic.update(topic, { where: { id: topic.id } });
}

async function deleteTopicById(id: number): Promise<number> {
  return Topic.destroy({ where: { id } });
}

async function getTopicById(id: number): Promise<ITopic | null> {
  return Topic.findOne({ where: { id } });
}

async function getAllTopics(): Promise<ITopic[]> {
  return Topic.findAll();
}

export default {
  createTopic,
  updateTopicById,
  deleteTopicById,
  getTopicById,
  getAllTopics
};
