package vzh.cms.consumer;

import java.util.Arrays;
import java.util.function.Consumer;

/**
 * @author Viktar Zhyhunou
 */
public class MultiConsumer<T> implements Consumer<T> {

    private Consumer<T>[] consumers;

    public MultiConsumer(Consumer<T>... consumers) {
        this.consumers = consumers;
    }

    @Override
    public void accept(T entity) {
        Arrays.stream(consumers).forEach(c -> c.accept(entity));
    }
}
