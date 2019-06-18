package vzh.cms.consumer;

import vzh.cms.model.Item;

import java.util.Date;
import java.util.function.Consumer;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
public class ActiveTagsItemConsumer<T extends Item> implements Consumer<T> {

    private Date current = new Date();

    @Override
    public void accept(T item) {
        item.getTags().stream().filter(t ->
                t.getStart() != null && current.before(t.getStart()) || t.getEnd() != null && current.after(t.getEnd())
        ).collect(Collectors.toSet()).forEach(t -> item.getTags().remove(t));
    }
}
