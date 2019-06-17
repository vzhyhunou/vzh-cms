package vzh.cms.consumer;

import vzh.cms.model.Content;

import java.util.function.Consumer;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
public class LangContentConsumer<T extends Content> implements Consumer<T> {

    private String lang;

    public LangContentConsumer(String lang) {
        this.lang = lang;
    }

    @Override
    public void accept(T content) {
        content.getProperties().keySet().stream().filter(k -> !k.equals(lang)).collect(Collectors.toSet())
                .forEach(k -> content.getProperties().remove(k));
    }
}
