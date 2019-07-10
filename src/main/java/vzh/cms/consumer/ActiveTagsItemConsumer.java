package vzh.cms.consumer;

import org.springframework.stereotype.Component;
import vzh.cms.model.Item;

import java.util.Date;
import java.util.function.Consumer;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
@Component
public class ActiveTagsItemConsumer<T extends Item> implements Consumer<T> {

    @Override
    public void accept(T item) {
        Date current = new Date();
        item.getTags().stream().filter(t ->
                t.getStart() != null && current.before(t.getStart()) || t.getEnd() != null && current.after(t.getEnd())
        ).collect(Collectors.toSet()).forEach(t -> item.getTags().remove(t));
    }
}
