import Topic, { ITopic } from '../models/topic.model';
import User from '../models/user.model';

async function createTopic(
  title: string,
  text: string,
  userId: number,
  tag: string,
  imageUrl: string
): Promise<Topic | null> {
  return await Topic.create({ title, text, userId, tag, imageUrl } );
}

async function updateTopicById(
  topic: ITopic
): Promise<[affectedCount: number]> {
  return await Topic.update(topic, { where: { id: topic.id } });
}

async function deleteTopicById(id: number): Promise<number> {
  return await Topic.destroy({ where: { id } });
}

async function getTopicById(id: number): Promise<Topic | null> {
  return await Topic.findOne({
    where: { id },
    include: { model: User, required: true }
  }).then(model => {
    if (!model) {
      return null;
    }
    return model.increment(['viewsCount'], { by: 1 });
  });
}

async function getAllTopics(): Promise<Topic[]> {
  return await Topic.findAll({
    include: { model: User, required: true }
  });
}

async function getAllTags(): Promise<string[]> {
  const allTags = (await Topic.findAll()).map(t => t.tag); // Написать правильный запрос
  return [...new Set(allTags)];
}

export default {
  createTopic,
  updateTopicById,
  deleteTopicById,
  getTopicById,
  getAllTopics,
  getAllTags
};
