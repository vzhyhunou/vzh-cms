package vzh.cms.component;

import org.springframework.stereotype.Component;
import vzh.cms.model.Item;
import vzh.cms.model.Tag;

import java.util.Date;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
@Component("activeTagsFunction")
public class ActiveTagsFunction implements Function<Item, Set<String>> {

    @Override
    public Set<String> apply(Item item) {
        Date d = new Date();
        return item.getTags().stream()
                .filter(t -> (t.getStart() == null || d.after(t.getStart())) && (t.getEnd() == null || d.before(t.getEnd())))
                .map(Tag::getName)
                .collect(Collectors.toSet());
    }
}
