package vzh.cms.component;

import org.springframework.stereotype.Component;
import vzh.cms.model.Tag;

import java.util.Date;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
@Component
public class ActiveTagsFunction implements Function<Set<Tag>, Set<Tag>> {

    @Override
    public Set<Tag> apply(Set<Tag> tags) {
        Date d = new Date();
        tags.stream()
                .filter(t -> t.getStart() != null && d.before(t.getStart()) || t.getEnd() != null && d.after(t.getEnd()))
                .collect(Collectors.toSet()).forEach(tags::remove);
        return tags;
    }
}
