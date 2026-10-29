import unittest

from support import run_solution


class PreviousCharactersTest(unittest.TestCase):
    def test_case_01_abc(self):
        """abc."""
        result = run_solution('previous-characters', 'abc\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '`\na\nb\n')

    def test_case_02_i_there(self):
        """Hi there."""
        result = run_solution('previous-characters', 'Hi there\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'G\nh\ns\ng\nd\nq\nd\n')


if __name__ == "__main__":
    unittest.main()
