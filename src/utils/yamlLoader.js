import yaml from 'js-yaml';

export const loadResponses = async () => {
    try {
        const response = await fetch('/mock_responses.yml');
        const yamlText = await response.text();
        const yamlData = yaml.load(yamlText);

        // 将所有类别的响应合并到一个对象中
        const responses = {};
        Object.values(yamlData.responses).forEach(category => {
            category.forEach(item => {
                responses[item.question] = {
                    thought: item.thought,
                    action: item.action,
                    data_source: item.data_source,
                    content: item.content.replace(/\n/g, '<br>')
                };
            });
        });

        return responses;
    } catch (error) {
        console.error('加载响应数据失败:', error);
        throw error;
    }
}; 